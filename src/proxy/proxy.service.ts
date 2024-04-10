import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProxyService {
  async fetchDataFromUrl(url: string): Promise<any> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data from URL: ${error.message}`);
    }
  }
}
