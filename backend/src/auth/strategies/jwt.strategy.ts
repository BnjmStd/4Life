import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Passport } from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt'

process.loadEnvFile()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor () {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: process.env.JWT_SECRET, 
            }
        )
    }

    async validate(payload: any) {
        return {
            userId: payload.id,
            email: payload.email,
        }
    }
}