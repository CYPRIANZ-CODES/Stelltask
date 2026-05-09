import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { HackathonStatus, ProjectStatus } from '@prisma/client';

@Injectable()
export class HackathonsService {
  constructor(private prisma: PrismaService) {}

  async createHackathon(organizerId: string, dto: any) {
    // Validate dates: registrationStart < registrationEnd < submissionStart < submissionEnd
    if (dto.registrationStart >= dto.registrationEnd) {
      throw new BadRequestException('registrationStart must be before registrationEnd');
    }
    if (dto.registrationEnd >= dto.submissionStart) {
      throw new BadRequestException('registrationEnd must be before submissionStart');
    }
    if (dto.submissionStart >= dto.submissionEnd) {
      throw new BadRequestException('submissionStart must be before submissionEnd');
    }
    if (dto.votingStart && dto.votingEnd && dto.votingStart >= dto.votingEnd) {
      throw new BadRequestException('votingStart must be before votingEnd');
    }
    if (dto.votingEnd && dto.submissionEnd >= dto.votingEnd) {
      throw new BadRequestException('submissionEnd must be before votingEnd');
    }

    // Validate prizePoolXLM >= 10 XLM minimum
    if (dto.prizePoolXLM < 10) {
      throw new BadRequestException('prizePoolXLM must be at least 10 XLM');
    }

    // Validate judgingCriteria structure (must have weights summing to 100)
    if (!dto.judgingCriteria || !Array.isArray(dto.judgingCriteria)) {
      throw new BadRequestException('judgingCriteria must be an array');
    }
    const totalWeight = dto.judgingCriteria.reduce((sum: number, c: any) => sum + (c.weight || 0), 0);
    if (totalWeight !== 100) {
      throw new BadRequestException(`judgingCriteria weights must sum to 100, got ${totalWeight}`);
    }

    return this.prisma.hackathon.create({
      data: {
        title: dto.title,
        description: dto.description,
        shortDescription: dto.shortDescription,
        bannerImageUrl: dto.bannerImageUrl,
        prizePoolXLM: dto.prizePoolXLM,
        registrationStart: new Date(dto.registrationStart),
        registrationEnd: new Date(dto.registrationEnd),
        submissionStart: new Date(dto.submissionStart),
        submissionEnd: new Date(dto.submissionEnd),
        votingStart: dto.votingStart ? new Date(dto.votingStart) : null,
        votingEnd: dto.votingEnd ? new Date(dto.votingEnd) : null,
        maxParticipants: dto.maxParticipants,
        maxTeamSize: dto.maxTeamSize || 5,
        allowTeamProjects: dto.allowTeamProjects ?? true,
        requireRegistration: dto.requireRegistration ?? true,
        judgingCriteria: dto.judgingCriteria,
        organizerId,
        status: HackathonStatus.DRAFT,
      },
    });
  }

  async publishHackathon(hackathonId: string, organizerId: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });

    if (!hackathon) {
      throw new NotFoundException('Hackathon not found');
    }

    if (hackathon.organizerId !== organizerId) {
      throw new ForbiddenException('You are not the organizer of this hackathon');
    }

    if (hackathon.status !== HackathonStatus.DRAFT) {
      throw new BadRequestException('Only DRAFT hackathons can be published');
    }

    // Verify all required fields are complete
    if (!hackathon.title || !hackathon.description || !hackathon.prizePoolXLM) {
      throw new BadRequestException('Hackathon is missing required fields');
    }

    // Update status to PUBLISHED (escrow would be handled by a separate Stellar service)
    return this.prisma.hackathon.update({
      where: { id: hackathonId },
      data: {
        status: HackathonStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });
  }

  async confirmFunding(hackathonId: string, txHash: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });

    if (!hackathon) {
      throw new NotFoundException('Hackathon not found');
    }

    // Update with funding transaction hash
    return this.prisma.hackathon.update({
      where: { id: hackathonId },
      data: {
        publishedAt: new Date(),
      },
    });
  }

  async registerParticipant(hackathonId: string, userId: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });

    if (!hackathon) {
      throw new NotFoundException('Hackathon not found');
    }

    const now = new Date();
    if (hackathon.status !== HackathonStatus.PUBLISHED && hackathon.status !== HackathonStatus.REGISTRATION_CLOSED) {
      throw new BadRequestException('Hackathon is not accepting registrations');
    }

    if (now < hackathon.registrationStart || now > hackathon.registrationEnd) {
      throw new BadRequestException('Registration is not open');
    }

    // Check maxParticipants
    if (hackathon.maxParticipants) {
      const participantCount = await this.prisma.hackathonParticipant.count({
        where: { hackathonId },
      });
      if (participantCount >= hackathon.maxParticipants) {
        throw new BadRequestException('Hackathon has reached maximum participants');
      }
    }

    // Check if already registered
    const existing = await this.prisma.hackathonParticipant.findUnique({
      where: {
        hackathonId_userId: {
          hackathonId,
          userId,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('Already registered for this hackathon');
    }

    return this.prisma.hackathonParticipant.create({
      data: {
        hackathonId,
        userId,
      },
    });
  }

  async submitProject(userId: string, hackathonId: string, dto: any) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });

    if (!hackathon) {
      throw new NotFoundException('Hackathon not found');
    }

    const now = new Date();
    if (hackathon.status !== HackathonStatus.SUBMISSION_OPEN) {
      throw new BadRequestException('Hackathon is not accepting submissions');
    }

    if (now < hackathon.submissionStart || now > hackathon.submissionEnd) {
      throw new BadRequestException('Submission period is not open');
    }

    if (hackathon.requireRegistration) {
      const participant = await this.prisma.hackathonParticipant.findUnique({
        where: {
          hackathonId_userId: {
            hackathonId,
            userId,
          },
        },
      });

      if (!participant) {
        throw new BadRequestException('You must register for this hackathon before submitting');
      }
    }

    // Create project with team members
    const project = await this.prisma.hackathonProject.create({
      data: {
        hackathonId,
        title: dto.title,
        description: dto.description,
        demoUrl: dto.demoUrl,
        repoUrl: dto.repoUrl,
        videoUrl: dto.videoUrl,
        screenshots: dto.screenshots || [],
        techStack: dto.techStack || [],
        submittedBy: userId,
        status: ProjectStatus.SUBMITTED,
        submittedAt: new Date(),
        isPublic: false,
      },
    });

    // Add team members
    if (dto.teamMembers && dto.teamMembers.length > 0) {
      for (const member of dto.teamMembers) {
        await this.prisma.hackathonTeamMember.create({
          data: {
            projectId: project.id,
            userId: member.userId,
            role: member.role || 'MEMBER',
          },
        });
      }
    }

    return this.prisma.hackathonProject.findUnique({
      where: { id: project.id },
      include: {
        teamMembers: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profile: true,
              },
            },
          },
        },
      },
    });
  }

  async reviewProject(judgeId: string, projectId: string, dto: any) {
    const project = await this.prisma.hackathonProject.findUnique({
      where: { id: projectId },
      include: {
        hackathon: {
          include: {
            judges: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Verify judge is assigned to this hackathon
    const isJudge = project.hackathon.judges.some(j => j.userId === judgeId);
    if (!isJudge) {
      throw new ForbiddenException('You are not a judge for this hackathon');
    }

    if (project.status !== ProjectStatus.SUBMITTED && project.status !== ProjectStatus.UNDER_REVIEW) {
      throw new BadRequestException('Project must be SUBMITTED or UNDER_REVIEW to be reviewed');
    }

    // Calculate totalScore from weighted criteria
    let totalScore = 0;
    for (const score of dto.criteriaScores) {
      totalScore += score.score;
    }

    // Create or update review
    const review = await this.prisma.projectReview.upsert({
      where: {
        projectId_judgeId: {
          projectId,
          judgeId,
        },
      },
      update: {
        criteriaScores: dto.criteriaScores,
        totalScore,
        feedback: dto.feedback,
      },
      create: {
        projectId,
        judgeId,
        criteriaScores: dto.criteriaScores,
        totalScore,
        feedback: dto.feedback,
      },
    });

    // Update project status to UNDER_REVIEW
    await this.prisma.hackathonProject.update({
      where: { id: projectId },
      data: {
        status: ProjectStatus.UNDER_REVIEW,
      },
    });

    // Check if all judges have reviewed
    const allReviews = await this.prisma.projectReview.findMany({
      where: { projectId },
    });

    if (allReviews.length === project.hackathon.judges.length) {
      // Calculate average score
      const avgScore = allReviews.reduce((sum, r) => sum + r.totalScore, 0) / allReviews.length;
      
      await this.prisma.hackathonProject.update({
        where: { id: projectId },
        data: {
          status: ProjectStatus.REVIEWED,
          totalScore: avgScore,
        },
      });
    }

    return review;
  }

  async calculateWinners(hackathonId: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
      include: {
        projects: {
          where: {
            status: ProjectStatus.REVIEWED,
          },
          orderBy: {
            totalScore: 'desc',
          },
        },
      },
    });

    if (!hackathon) {
      throw new NotFoundException('Hackathon not found');
    }

    if (hackathon.status !== HackathonStatus.VOTING_CLOSED) {
      throw new BadRequestException('Voting must be closed before calculating winners');
    }

    // Rank projects
    const rankedProjects = hackathon.projects.map((project, index) => ({
      ...project,
      rank: index + 1,
    }));

    // Update project ranks
    for (const project of rankedProjects) {
      await this.prisma.hackathonProject.update({
        where: { id: project.id },
        data: { rank: project.rank },
      });
    }

    // Create prize distribution (default tier system)
    const prizeDistribution = [];
    const tiers = [
      { rank: 1, percentage: 0.5 },
      { rank: 2, percentage: 0.3 },
      { rank: 3, percentage: 0.15 },
    ];

    for (const tier of tiers) {
      const project = rankedProjects.find(p => p.rank === tier.rank);
      if (project) {
        const prizeXLM = hackathon.prizePoolXLM * tier.percentage;
        const distribution = await this.prisma.prizeDistribution.create({
          data: {
            hackathonId,
            rank: tier.rank,
            prizeXLM,
            projectId: project.id,
          },
        });
        prizeDistribution.push(distribution);
      }
    }

    return prizeDistribution;
  }

  async announceWinners(hackathonId: string, organizerId: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });

    if (!hackathon) {
      throw new NotFoundException('Hackathon not found');
    }

    if (hackathon.organizerId !== organizerId) {
      throw new ForbiddenException('You are not the organizer of this hackathon');
    }

    // Set hackathon status to WINNERS_ANNOUNCED
    await this.prisma.hackathon.update({
      where: { id: hackathonId },
      data: {
        status: HackathonStatus.WINNERS_ANNOUNCED,
        announcementDate: new Date(),
      },
    });

    // Note: Actual Stellar payouts would be handled by a separate payment service
    // This is a placeholder for that integration
    
    return { message: 'Winners announced successfully' };
  }

  async listHackathons(filters: any = {}) {
    const where: any = {};

    if (filters.status) {
      where.status = filters.status;
    }

    return this.prisma.hackathon.findMany({
      where,
      include: {
        organizer: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        _count: {
          select: {
            projects: true,
            participants: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getHackathon(hackathonId: string) {
    return this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
      include: {
        organizer: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        projects: {
          where: {
            status: ProjectStatus.SUBMITTED,
          },
          include: {
            submitter: {
              select: {
                id: true,
                email: true,
                profile: true,
              },
            },
            teamMembers: {
              include: {
                user: {
                  select: {
                    id: true,
                    email: true,
                    profile: true,
                  },
                },
              },
            },
          },
          orderBy: {
            totalScore: 'desc',
          },
        },
        judges: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profile: true,
              },
            },
          },
        },
        _count: {
          select: {
            projects: true,
            participants: true,
          },
        },
      },
    });
  }

  async addJudge(hackathonId: string, organizerId: string, judgeId: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });

    if (!hackathon) {
      throw new NotFoundException('Hackathon not found');
    }

    if (hackathon.organizerId !== organizerId) {
      throw new ForbiddenException('You are not the organizer of this hackathon');
    }

    return this.prisma.hackathonJudge.create({
      data: {
        hackathonId,
        userId: judgeId,
      },
    });
  }

  async getHackathonProjects(hackathonId: string) {
    return this.prisma.hackathonProject.findMany({
      where: { hackathonId },
      include: {
        submitter: {
          select: {
            id: true,
            email: true,
            profile: true,
          },
        },
        teamMembers: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profile: true,
              },
            },
          },
        },
        reviews: {
          include: {
            judge: {
              select: {
                id: true,
                email: true,
                profile: true,
              },
            },
          },
        },
      },
      orderBy: {
        totalScore: 'desc',
      },
    });
  }
}
