import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // generate welcome to our org message
    return 'Hello World!';
  }
}
