import { Injectable } from '@nestjs/common';
import axios from 'axios';

const HEADER = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
};

interface IParserValue {
  url: string;
  options: string;
  target: string;
}

@Injectable()
export class TransformService {
  async parserValue({ url, options, target }: IParserValue) {
    const currentOptions = JSON.parse(decodeURIComponent(options) || '');
    const response = await axios.post(url, currentOptions, {
      headers: HEADER,
    });

    const responseData = response.data;
    const responseValue = responseData[target];
    if (!responseValue) {
      return;
    }

    return responseValue;
  }
}
