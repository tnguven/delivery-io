import type { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';

import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('App controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication(new ExpressAdapter(), {
      bodyParser: false,
    });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('/comms/your-next-delivery/:userId', () => {
    describe('happy path', () => {
      test('get delivery', async () => {
        await request(app.getHttpServer())
          .get('/comms/your-next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5')
          .expect(200)
          .expect((res) =>
            expect(res.body).toEqual({
              freeGift: true,
              message:
                "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian, Eldridge and Ocie's fresh food.",
              title: 'Your next delivery for Dorian, Eldridge and Ocie',
              totalPrice: '134.00',
            }),
          );
      });
    });

    describe('unhappy path', () => {
      test('get not found 404', async () => {
        await request(app.getHttpServer())
          .get('/comms/your-next-delivery/wrong-id')
          .expect(404)
          .expect((res) =>
            expect(res.body).toEqual({
              status: 404,
            }),
          );
      });
    });
  });
});
