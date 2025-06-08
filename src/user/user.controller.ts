import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateProfileDto } from './dto/user-dto';
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

  @Put('edit-profile/:userId')
  updateProfile(
    @Param('userId') userId: string,
    @Body() data: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(userId, data);
  }
}
