import { IsString, IsNumber, IsArray, IsOptional, IsBoolean, Min, Max } from 'class-validator';

export class CreateHackathonDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  bannerImageUrl?: string;

  @IsNumber()
  @Min(10)
  prizePoolXLM: number;

  @IsString()
  registrationStart: string;

  @IsString()
  registrationEnd: string;

  @IsString()
  submissionStart: string;

  @IsString()
  submissionEnd: string;

  @IsOptional()
  @IsString()
  votingStart?: string;

  @IsOptional()
  @IsString()
  votingEnd?: string;

  @IsOptional()
  @IsNumber()
  maxParticipants?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  maxTeamSize?: number;

  @IsOptional()
  @IsBoolean()
  allowTeamProjects?: boolean;

  @IsOptional()
  @IsBoolean()
  requireRegistration?: boolean;

  @IsArray()
  judgingCriteria: Array<{
    name: string;
    description?: string;
    weight: number;
  }>;
}
