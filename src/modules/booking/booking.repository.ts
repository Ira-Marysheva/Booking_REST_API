import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booking, BookingDocument } from "./schemas/booking.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class BookingRepository {
    constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>){}

    // method to find bookings on the database and params to filter the query
    async findOne(bookinfFilterQvery: FilterQuery<Booking>):Promise<Booking>{
        return this.bookingModel.findOne(bookinfFilterQvery);
    }

    // method to find all bookings on the database and params to filter the query
    async find(bookingFilterQuery:FilterQuery<Booking>):Promise<Booking[]>{
        return this.bookingModel.find(bookingFilterQuery);
    }

    // method to create a new booking on the database
    async create(booking:Booking):Promise<Booking>{
        const newBooking = new this.bookingModel(booking)
        return newBooking.save();
    }

    // method to update a booking on the database
    async update(bookingFilterQuery:FilterQuery<Booking>,booking:Partial<Booking>):Promise<Booking>{
        return this.bookingModel.findOneAndUpdate(bookingFilterQuery, booking);
    }
}