import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/singup.dto';

@Controller('auth')
@ApiTags('Authentication and registration')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('login')
    @Public()
    async login(@Body() data: LoginDto) {
        const userToken = await this.authService.validateUser(data)
    
        if (!userToken) throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        
        return userToken 
    }

    @Post('Singup')
    @Public()
    async signup(@Body() data: SignupDto) {
        return this.authService.createUserSignUp(data)
    }
}
