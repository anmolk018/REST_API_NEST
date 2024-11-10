import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './config';
import { DashboardController } from './dashboard/dashboard.controller';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeORMConfig),
    UsersModule, AuthModule,
  ],
  controllers: [AppController, DashboardController, HealthController],
  providers: [AppService],
})
export class AppModule { }
