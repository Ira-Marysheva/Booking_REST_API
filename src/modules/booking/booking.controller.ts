import { Controller, Param, Get, Post, Body, Patch } from '@nestjs/common';
import { BookingsService } from './booking.service';
import { Booking } from './schemas/booking.schema';
import { createBookingDTO } from './dto/createBooking.dto';
import { UpdatedBookingDto } from './dto/updatedBooking.dto';

@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingsService: BookingsService){}

    @Get(':bookingId')
    async getBooking(@Param('bookingId') bookingId: string): Promise<Booking> {
        return this.bookingsService.getBookingId(bookingId);
    }

    @Get()
    async getBookings(): Promise<Booking[]> {
        return this.bookingsService.getBookings();
    }

    @Post()
    async createBooking(@Body() createBookingDTO: createBookingDTO) { // : Promise<Booking>
        return this.bookingsService.createBooking(createBookingDTO)
    }

    // @Patch(':bookingId')
    // async updateBooking(@Param('bookingId') bookingId: string, @Body() updateBookingDTO: UpdatedBookingDto): Promise<Booking> {
    // return this.bookingsService.updateBooking(bookingId, updateBookingDTO)
    // }

    @Patch(':bookingId')
    async deleteBooking(@Param('bookingId') bookingId: string): Promise<String> {
        return this.bookingsService.deleteBooking(bookingId)
    }
}
