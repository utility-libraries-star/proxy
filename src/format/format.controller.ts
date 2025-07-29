import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Query
} from '@nestjs/common';
import { FormatService } from './format.service';
import axios from 'axios';

@Controller('format')
export class FormatController {
  constructor(private readonly formatterService: FormatService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async formatData(@Query() parameters: any): Promise<any> {
    const { url, ...otherParameters } = parameters;

    if (!url) {
      throw new BadRequestException('URL is required');
    }

    try {
      const response = await axios.get(url);
      const responseData = response.data;

      const formattedData: any = {};

      if (!parameters.startValue) {
        formattedData.startValue = '0';
      }

      Object.entries(otherParameters).forEach(
        ([key, value]: [key: string, value: string]) => {
          const parseValue = value.slice(1, -1).split(', ');
          const isArray = Array.isArray(parseValue);

          const formattedValue = isArray
            ? this.formatterService.getValueByArray(responseData, parseValue)
            : this.formatterService.getValue(responseData, value);

          formattedData[key] = String(formattedValue);
        }
      );

      return formattedData;
    } catch (error) {
      throw new Error('Failed to format data');
    }
  }
}
