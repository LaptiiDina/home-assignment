import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(message: string, httpStatus: HttpStatus ) {
    super(message, httpStatus);
  }
}
 