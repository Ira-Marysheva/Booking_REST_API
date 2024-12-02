import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {v4 as uuidv4} from 'uuid'
import { Document } from "mongoose";

export type BookingDocument = Booking & Document;

@Schema()
export class Booking{
    @Prop({ required: true, unique: true })
    idBooking:string = uuidv4()
    @Prop({ required: true })
    user:string
    @Prop({ required: true })
    date: String
    @Prop({ required: true })
    startTime:string
    @Prop({ required: true })
    endTime:string
}

export const BookingSchema = SchemaFactory.createForClass(Booking);