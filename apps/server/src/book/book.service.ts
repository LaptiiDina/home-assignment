import { HttpStatus, Injectable } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { PrismaService } from 'prisma/prisma.service';
import { AppException } from 'src/exception/app.exception';


const PRISMA_NOT_FOUND_ERROR = 'P2025';
//An operation failed because it depends on one or more records that were required but not found

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: BookDto) {
   try{ return await this.prisma.book.create({
      data: createBookDto,
    });
  }
  catch(error){
    throw new AppException(
      `Failed to create a book: ${error.message}`,
      HttpStatus.BAD_REQUEST
    );
  }
  }

  async findAll() {
    try {
      return await this.prisma.book.findMany();
    } catch (error) {
      throw new AppException(
        `Failed to retrieve books: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findByTitle(title: string) {
    try {
    return this.prisma.book.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive', 
        },
      },
    });
  } catch (error) {
    if (error.code === PRISMA_NOT_FOUND_ERROR) {
      throw new AppException(
        `Book with ID ${title} not found`,
        HttpStatus.NOT_FOUND
      );
    } else {
      throw new AppException(
        `Failed to update book: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  }

  async update(id: number, updateBookDto: BookDto) {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      });
    } catch (error) {
      if (error.code === PRISMA_NOT_FOUND_ERROR) {
        throw new AppException(
          `Book with ID ${id} not found`,
          HttpStatus.NOT_FOUND
        );
      } else {
        throw new AppException(
          `Failed to update book: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.book.delete({ where: { id } });
    } catch (error) {
      if (error.code === PRISMA_NOT_FOUND_ERROR) { 
        throw new AppException(
          `Book with ID ${id} not found`,
          HttpStatus.NOT_FOUND
        );
      } else {
        throw new AppException(
          `Failed to delete book: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
