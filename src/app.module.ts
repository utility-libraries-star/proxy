import { Module } from '@nestjs/common';
import { FormatController } from './format/format.controller';
import { FormatService } from './format/format.service';

@Module({
  imports: [],
  controllers: [FormatController],
  providers: [FormatService],
})
export class AppModule {}
