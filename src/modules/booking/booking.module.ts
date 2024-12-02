import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { BookingsService } from './booking.service';
import { BookingRepository } from './booking.repository';
import { BookingController } from './booking.controller';

@Module({
    imports: [MongooseModule.forFeature([{name:Booking.name, schema:BookingSchema}])],
    providers: [BookingsService, BookingRepository],
    controllers:[BookingController],
    exports:[BookingsService]
})
export class BookingsModule {}
