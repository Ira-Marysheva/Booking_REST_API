import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {v4 as uuidv4} from 'uuid'
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export type BookingDocument = Booking & Document;

@Schema()
export class Booking{
    @ApiProperty({required:true,description:'Unique identifier of the booking'})
    @IsString()
    @Prop({ required: true, unique: true })
    idBooking:string = uuidv4()

    @ApiProperty({required:true,description:'User who made the booking'})
    @Prop({ required: true })
    user:string

    @ApiProperty({required:true,description:'Date of the booking'})
    @Prop({ required: true })
    date: String

    @ApiProperty({required:true,description:'Start time of the booking'})
    @Prop({ required: true })
    startTime:string
    
    @ApiProperty({required:true,description:'End time of the booking'})
    @Prop({ required: true })
    endTime:string
}

export const BookingSchema = SchemaFactory.createForClass(Booking);