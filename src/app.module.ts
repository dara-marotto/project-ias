import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmConfigModule } from './database/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    HttpModule, 
    TypeOrmConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
