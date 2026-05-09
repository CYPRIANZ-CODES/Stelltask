import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PaymentsModule } from './payments/payments.module';
import { AdminModule } from './admin/admin.module';
import { HackathonsModule } from './hackathons/hackathons.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TasksModule,
    PaymentsModule,
    AdminModule,
    HackathonsModule,
    WalletModule,
  ],
})
export class AppModule {}
