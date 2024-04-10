import { Module } from '@nestjs/common';
import { FormatController } from './format/format.controller';
import { FormatService } from './format/format.service';
import { MockRestApiController } from './mock-rest-api/mock-rest-api.controller';
import { MockRestApiService } from './mock-rest-api/mock-rest-api.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TransformController } from './transform/transform.controller';
import { TransformService } from './transform/transform.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [FormatController, MockRestApiController, TransformController],
  providers: [FormatService, MockRestApiService, TransformService],
})
export class AppModule {}
