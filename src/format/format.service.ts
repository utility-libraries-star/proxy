import { Injectable } from '@nestjs/common';

@Injectable()
export class FormatService {
  getValueByArray(entries: unknown, path: string[]) {
    let value = entries;
    for (const key of path) {
      if (value[key] !== undefined) {
        value = value[key];
      } else {
        return undefined;
      }
    }
    return value;
  }

  getValue(entries: unknown, path: string) {
    return entries[path];
  }
}
