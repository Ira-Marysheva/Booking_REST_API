import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from '../booking/booking.service';
import { Booking } from './schemas/booking.schema';
import { BookingRepository } from '../booking/booking.repository';
import { UpdatedBookingDto } from './dto/updatedBooking.dto';

describe('BookingsService', () => {
  let service: BookingsService;
  let repository: BookingRepository;

  const mockBookingRepository = {
    createBooking: jest.fn(),
    getBookingId: jest.fn(),
    getBookings: jest.fn(),
    updateBooking: jest.fn(),
    deleteBooking: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),

  };

  const mockDataFromDB = {
    _id: "674dc85094c0fe0ada24e533",
    idBooking: "fc3235c3-5f93-4999-b65d-86a13f4b5ecf",
    user: "Ira Marysheva",
    date: "2024-10-11",
    startTime: "10:00",
    endTime: "11:00",
    __v: 0
  }
  const mockCreateBookingDTO = {
    idBooking:mockDataFromDB.idBooking,
    user:mockDataFromDB.user,
    date:mockDataFromDB.date, 
    startTime:mockDataFromDB.startTime, 
    endTime:mockDataFromDB.endTime, 
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: BookingRepository,
          useValue: mockBookingRepository,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    repository = module.get<BookingRepository>(BookingRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBooking', () => {
    it('should create a booking', async () => {
      const booking = {
        idBooking: expect.any(String),
        date:  expect.any(String),
        endTime: expect.any(String),
        startTime:  expect.any(String),
        user:  expect.any(String),
      } // create a new booking instance
      jest.spyOn(repository, 'create').mockResolvedValue(booking);

      expect(await service.createBooking(mockCreateBookingDTO)).toBe(booking);

      expect(repository.create).toHaveBeenCalledWith(expect.objectContaining({
        idBooking: expect.any(String),
        date: mockCreateBookingDTO.date,
        endTime: mockCreateBookingDTO.endTime,
        startTime: mockCreateBookingDTO.startTime,
        user: mockCreateBookingDTO.user,
      }));
    });
  });

  describe('getBookings', () => {
    it('should return an array of bookings', async () => {
      const bookingArray :Booking[] = [{...mockCreateBookingDTO}, {...mockCreateBookingDTO}];
      jest.spyOn(repository, 'find').mockResolvedValue(bookingArray);

      const result = await service.getBookings();
      expect(result).toBe(bookingArray);

      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('getBookingId', () => {
    it('should return a booking', async () => {
      const booking = { ...mockDataFromDB }
      jest.spyOn(repository, 'findOne').mockResolvedValue(booking);
      const result = await service.getBookingId(mockDataFromDB.idBooking);
      expect(result).toBe(booking);
      expect(repository.findOne).toHaveBeenCalledWith({ idBooking:mockDataFromDB.idBooking});
    });
  });

  describe('updateBooking', () => {
    it('should update a booking', async () => {
      const updatedBooking = { ...mockDataFromDB, ...mockCreateBookingDTO }
      jest.spyOn(repository, 'update').mockResolvedValue(updatedBooking);
      const result = await service.updateBooking(mockDataFromDB.idBooking, mockCreateBookingDTO);
      expect(result).toBe(updatedBooking);
      expect(repository.update).toHaveBeenCalledWith({"idBooking": mockDataFromDB.idBooking}, mockCreateBookingDTO);
    });
  });
});