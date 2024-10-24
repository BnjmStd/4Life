import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  Req
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UsersEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(
    JwtAuthGuard
  )
  async findAll(@Req() req: AuthenticatedRequest) {
    req.user
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: UsersEntity
  })
  async findOne(@Param('id') id: string) {
    const userId = parseInt(id);
    console.log(userId)
    return this.usersService.findOne(userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
