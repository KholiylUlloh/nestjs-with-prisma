import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}
  create(createAuthor: Prisma.AuthorCreateInput) {
    return this.prisma.author.create({
      data: createAuthor
    });
  }

  findAll() {
    return this.prisma.author.findMany({
      include:{
        books:{
          select:{
            title: true,
            id: true
        }
      }
    }
    });
  }

  findOne(where: Prisma.AuthorWhereUniqueInput) {
    return this.prisma.author.findUnique({
      where
    });
  }

  update(where: Prisma.AuthorWhereUniqueInput, data: Prisma.AuthorUpdateInput) {
    return this.prisma.author.update({
      where,
      data
    });
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
