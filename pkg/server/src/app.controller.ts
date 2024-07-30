import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('comms')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('your-next-delivery/:userId')
  getNextDelivery(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const nextDelivery = this.appService.getNextDeliveryById(userId);
      return res.json(nextDelivery);
    } catch (err) {
      if (err === 'Not found')
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
        });

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }
}
