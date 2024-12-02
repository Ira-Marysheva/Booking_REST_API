import { Controller, Param, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { BookingsService } from './booking.service';
import { Booking } from './schemas/booking.schema';
import { createBookingDTO } from './dto/createBooking.dto';
import { UpdatedBookingDto } from './dto/updatedBooking.dto';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingsService: BookingsService){}

    @ApiTags('Booking')
    @ApiResponse({ status: 200, description: 'Get a single booking by id', type: Booking })
    @ApiResponse({ status: 404, description: 'Booking not found' })
    @Get(':bookingId')
    async getBooking(@Param('bookingId') bookingId: string): Promise<Booking> {
        return this.bookingsService.getBookingId(bookingId);
    }

    @ApiResponse({ status: 200, description: 'Get all bookings', type: [Booking]  })
    @Get()
    async getBookings(): Promise<Booking[]> {
        return this.bookingsService.getBookings();
    }

    @ApiResponse({ status: 201, description: 'Create a new booking',  type: Booking })
    @ApiProperty({type: createBookingDTO})
    @Post()
    async createBooking(@Body() createBookingDTO: createBookingDTO): Promise<Booking> {
        return this.bookingsService.createBooking(createBookingDTO)
    }

    @ApiResponse({ status: 200, description: 'Update a booking', type: Booking })
    @ApiProperty({type: UpdatedBookingDto})
    @Patch(':bookingId')
    async updateBooking(@Param('bookingId') bookingId: string, @Body() updateBookingDTO: UpdatedBookingDto): Promise<Booking> {
    return this.bookingsService.updateBooking(bookingId, updateBookingDTO)
    }

    @ApiResponse({ status: 200, description: 'Delete a booking', type: String })
    @Delete(':bookingId')
    async deleteBooking(@Param('bookingId') bookingId: string): Promise<String> {
        return this.bookingsService.deleteBooking(bookingId)
    }
}
