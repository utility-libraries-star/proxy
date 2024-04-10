import { join } from 'path';
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

    const responseIp = await axios.get('https://api.ipify.org/?format=json');
    const currentIp = responseIp.data.ip;

    if (!currentIp) {
      return;
    }

    const responseLocation = await axios.get(
      `https://listen.klove.com/api/location?ip=${currentIp}`,
    );
    const currentLocation = responseLocation.data;
		console.log(currentLocation)

    const response = await axios.post(
      url,
      { ...currentOptions, ...currentLocation },
      {
        headers: HEADER,
      },
    );

    const responseData = response.data;
    const responseValue = responseData[target];
    if (!responseValue) {
      return;
    }

    return responseValue;
  }
}
