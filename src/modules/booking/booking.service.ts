import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { Booking } from './schemas/booking.schema';
import { v4 as uuidv4 } from 'uuid';
import { UpdatedBookingDto } from './dto/updatedBooking.dto';
import { createBookingDTO } from './dto/createBooking.dto';
import { ErrorText } from '../../error/index';

@Injectable()
export class BookingsService {
    constructor(private readonly bookingsRepository: BookingRepository){}

    async getBookingId(idBooking: string): Promise<Booking> {
        return this.bookingsRepository.findOne({idBooking});
    }

    async getBookings():Promise<Booking[]>{
        return this.bookingsRepository.find({idBooking: {$ne: null}});
    }

    async createBooking(createBookingDTO:createBookingDTO):Promise<Booking>{ 
        try {
            // fortated date and time to ISO format(YYYY-MM-DD and HH:mm)
            const value = new Date(createBookingDTO.date)
            const formatedDate = value.toISOString().split('T')[0]
            const update = /\d\d[-:]\d\d/g
            const startTime = createBookingDTO.startTime.match(update)[0]
            const endTime = createBookingDTO.endTime.match(update)[0]
    
            // check if start time is less than end time    
            if( startTime > endTime){
                throw new BadRequestException(ErrorText.TimeStartOrEndTimeError)
            }
            // check if time is already taken
            const booking = await this.bookingsRepository.find({date:formatedDate, startTime, endTime})
            if(booking){
               throw new BadRequestException(ErrorText.TimeISTaken)
            }
            
            // check if start time and end time are in the same hour
            if(startTime.split(':')[0] == endTime.split(':')[0]){
                throw new BadRequestException(ErrorText.TimeBettwenError)
            }
            // create booking
            return this.bookingsRepository.create({
                idBooking: uuidv4(),
                user:createBookingDTO.user,
                date: formatedDate,
                startTime:startTime,
                endTime:endTime,
            })
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async updateBooking(idBooking: string, updateBooking:UpdatedBookingDto): Promise<Booking> {
         // check if booking exist
         const booking = await this.getBookingId(idBooking);
         if(!booking){
             throw new BadRequestException(ErrorText.BookingNotFound)
         }
        return this.bookingsRepository.update({idBooking}, updateBooking);
    }

    async deleteBooking(idBooking: string):Promise<String> {
        try {
            // check if booking exist
            const booking = await this.getBookingId(idBooking);
            if(!booking){
                throw new BadRequestException(ErrorText.BookingNotFound)
            }
            //retun message to confirm delete
            return  "Your shure to delete this booking?"
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
