import { ApiProperty } from "@nestjs/swagger"
import {IsString} from "class-validator"

export class createBookingDTO{
    @ApiProperty({required:true,description:"User ID of the user who is booking"})
    @IsString()
    user:string
    @ApiProperty({required:true,description:"Date of the booking"})
    @IsString()
    date:string
    @ApiProperty({required:true,description:"Start time of the booking"})
    @IsString()
    startTime:string
    @ApiProperty({required:true,description:"End time of the booking"})
    @IsString()
    endTime:string
}