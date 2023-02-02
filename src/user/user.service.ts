import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import {hash, compare } from "bcrypt"


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}
  async create(createUserDto: CreateUserDto) {
    const  isUser = await this.prisma.user.findFirst({
      where: {email: createUserDto.email}
    })
  if (isUser) {
      throw new HttpException("user_already_exist", 
         HttpStatus.CONFLICT);
  }
  return await this.prisma.user.create({
      data: createUserDto
  });
  }

  async loginUser({email, password}: LoginUserDto){
    const user = await this.prisma.user.findFirst({where: {email}})

    if(!email || !password) {
      throw new HttpException("Please enter your email and password", HttpStatus.NO_CONTENT)
    }
    if(!user){
      throw new HttpException(`Oops seems you entered a wrong information`,  
                  HttpStatus.UNAUTHORIZED);
    }
    const comparePass = compare(password,user.password)
    if(!comparePass){
      throw new HttpException(`Oops seems you entered a wrong password`,  
                  HttpStatus.UNAUTHORIZED);
    }
    const {password: p, ...rest} = user
    return rest
  }

  getAllUsers(){
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
