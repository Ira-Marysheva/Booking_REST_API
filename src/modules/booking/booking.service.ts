import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { Booking } from './schemas/booking.schema';
import { v4 as uuidv4 } from 'uuid';
import { UpdatedBookingDto } from './dto/updatedBooking.dto';
import { createBookingDTO } from './dto/createBooking.dto';
import { ErrorText } from 'src/error';

@Injectable()
export class BookingsService {
    constructor(private readonly bookingsRepository: BookingRepository){}

    async getBookingId(idBooking: string): Promise<Booking> {
        return this.bookingsRepository.findOne({idBooking});
    }

    async getBookings():Promise<Booking[]>{
        return this.bookingsRepository.find({});
    }

    async createBooking(createBookingDTO:createBookingDTO):Promise<Booking>{ 
        const value = new Date(createBookingDTO.date)
        const formatedDate = value.toISOString().split('T')[0]
        const update = /\d\d[-:]\d\d/g
        const startTime = createBookingDTO.startTime.match(update)[0]
        const endTime = createBookingDTO.endTime.match(update)[0]

        if( startTime > endTime){
            throw new BadRequestException(ErrorText.TimeStartOrEndTimeError)
        }
        if((+endTime.split(':')[0] - +startTime.split(':')[0]) > 1){
            throw new BadRequestException(ErrorText.TimeBettwenIsBig)
        }

        const booking = await this.bookingsRepository.find({date:formatedDate})

        for (let i = 0; i < booking.length; i++) {
            if(booking[i].startTime.match(update)[0] == startTime && booking[i].endTime.match(update)[0] == endTime){
                throw new BadRequestException(ErrorText.TimeISTaken)
            }
        }

        if(startTime.split(':')[0] == endTime.split(':')[0]){
            throw new BadRequestException(ErrorText.TimeBettwenError)
        }

        return this.bookingsRepository.create({
            idBooking: uuidv4(),
            user:createBookingDTO.user,
            date: formatedDate,
            startTime:startTime,
            endTime:endTime,
        })
    }

    async updateBooking(idBooking: string, updateBooking:UpdatedBookingDto): Promise<Booking> {
        return this.bookingsRepository.update({idBooking}, updateBooking);
    }

    async deleteBooking(idBooking: string):Promise<String> {
        const booking = await this.getBookingId(idBooking);
        if(!booking){
            throw new BadRequestException(ErrorText.BookingNotFound)
        }
        return  "Your shure to delete this booking?"
    }
}
