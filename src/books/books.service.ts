import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService){}

  create(createBookDto: Prisma.BookCreateInput) {
    return this.prisma.book.create({
      data: createBookDto
    });
  }

  findAll() {
    return this.prisma.book.findMany({
      include: {
        author: {
          select:{
            name: true
          }
        }
      }
    });
  }

  findOne(id: Prisma.BookWhereUniqueInput) {
    return this.prisma.book.findUnique({
      where: id
    })
  }

  update(where: Prisma.BookWhereUniqueInput, data: Prisma.BookUpdateInput) {
    return this.prisma.book.update({
      where,
      data
    })
    ;
  }

  remove(where: Prisma.BookWhereUniqueInput) {
    return this.prisma.book.delete({where});
  }
}
