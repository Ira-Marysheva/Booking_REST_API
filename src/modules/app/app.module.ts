import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookingsModule } from '../booking/booking.module';

@Module({
  imports: [
    BookingsModule,
    ConfigModule.forRoot({isGlobal: true}), // Load environment variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri:process.env.MONGO_DB
        // uri: configService.get<string>('MONGODB_URI'), // Get URI from config
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
