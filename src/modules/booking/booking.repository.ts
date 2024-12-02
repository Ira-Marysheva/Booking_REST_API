import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booking, BookingDocument } from "./schemas/booking.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class BookingRepository {
    constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>){}

    // for test
    async findOne(bookinfFilterQvery: FilterQuery<Booking>):Promise<Booking>{
        return this.bookingModel.findOne(bookinfFilterQvery);
    }

    async find(bookingFilterQuery:FilterQuery<Booking>):Promise<Booking[]>{
        return this.bookingModel.find(bookingFilterQuery);
    }

    async create(booking:Booking):Promise<Booking>{
        const newBooking = new this.bookingModel(booking)
        return newBooking.save();
    }

    async update(bookingFilterQuery:FilterQuery<Booking>,booking:Partial<Booking>):Promise<Booking>{
        return this.bookingModel.findOneAndUpdate(bookingFilterQuery, booking);
    }
}