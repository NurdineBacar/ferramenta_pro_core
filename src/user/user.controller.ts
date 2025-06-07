import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-dto';
import { Public } from 'src/auth/const/constants';

@Public()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Post('store')
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Delete('delete-all')
  deleteAll() {
    return this.userService.deleteAll();
  }
}
