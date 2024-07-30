import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('FeatureService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [AppService],
    }).compile();
    jest.clearAllMocks();
    service = module.get<AppService>(AppService);
  });

  const catC = {
    name: 'C',
    subscriptionActive: true,
    pouchSize: 'D',
  };
  const catA = {
    name: 'A',
    subscriptionActive: true,
    pouchSize: 'E',
  };
  const catB = {
    name: 'B',
    subscriptionActive: false,
    pouchSize: 'F',
  };

  describe('getCatsNames', () => {
    test('must return A', () => {
      const result = service.getCatsNames([catA] as any);

      expect(result).toEqual('A');
    });

    test('Must return A and B', () => {
      const result = service.getCatsNames([catB, catA] as any);

      expect(result).toEqual('A and B');
    });

    test('Must return A and B', () => {
      const result = service.getCatsNames([catC, catB, catA] as any);

      expect(result).toEqual('A, B and C');
    });
  });

  describe('getTotalPrize', () => {
    test('Must return 135', () => {
      const result = service.getTotalPrize([catC, catB, catA] as any);
      expect(result).toEqual(135);
    });
  });

  describe('getNextDeliveryById', () => {
    test('Must return delivery entity', () => {
      const result = service.getNextDeliveryById(
        'b92faf0a-b378-44be-a806-2e94f0def4aa',
      );
      expect(result).toEqual({
        freeGift: false,
        message:
          "Hey Bria! In two days' time, we'll be charging you for your next order for Deja, Emmanuel and Madilyn's fresh food.",
        title: 'Your next delivery for Deja, Emmanuel and Madilyn',
        totalPrice: '71.25',
      });
    });
  });
});
