import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';
export class BookDto {
    @IsString()
    title: string;
  
    @IsString()
    author: string;
  
    @IsNumber()
    @IsPositive()
    price: number;
  
    @IsNumber()
    @IsPositive()
    quantity: number;
}
