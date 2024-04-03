import { Module } from '@nestjs/common';
import { FormatController } from './format/format.controller';
import { FormatService } from './format/format.service';
import { MockRestApiController } from './mock-rest-api/mock-rest-api.controller';
import { MockRestApiService } from './mock-rest-api/mock-rest-api.service';

@Module({
  imports: [],
  controllers: [FormatController, MockRestApiController],
  providers: [FormatService, MockRestApiService],
})
export class AppModule {}
