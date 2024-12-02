import {IsString} from "class-validator"

export class createBookingDTO{
    @IsString()
    user:string
    @IsString()
    date:string
    @IsString()
    startTime:string
    @IsString()
    endTime:string
}