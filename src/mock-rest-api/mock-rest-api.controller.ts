import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Query,
} from '@nestjs/common';
import { MockRestApiService } from './mock-rest-api.service';

@Controller('mock-rest-api')
export class MockRestApiController {
  constructor(private readonly mockRestApiService: MockRestApiService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getData(@Query('email') email: any): Promise<any> {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    return this.mockRestApiService.getDashboardLink(email);
  }
}
