import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: Prisma.BookCreateInput) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Prisma.BookWhereUniqueInput) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBook: UpdateBookDto) {
    return this.booksService.update({id:+id}, updateBook);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove({id: +id});
  }
}
