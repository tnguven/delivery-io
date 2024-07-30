import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((r) => r),
    end: jest.fn(),
  } as any;
  const mockAppService = {
    getNextDeliveryById: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "{ status": 404 }"', () => {
      mockAppService.getNextDeliveryById.mockImplementation(() => {
        throw 'Not found';
      });
      appController.getNextDelivery('userId', mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ status: 404 });
    });

    it('should return 500 INTERNAL SERVER ERROR', () => {
      mockAppService.getNextDeliveryById.mockImplementation(() => {
        throw 'some error';
      });
      appController.getNextDelivery('userId', mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.end).toHaveBeenCalled();
    });
  });
});
