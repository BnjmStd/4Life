import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { 
  SwaggerModule, 
  DocumentBuilder 
} from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Data4Life Api Documentation')
    .setDescription('CRUD ... ')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
      description: 'Enter you bearer token',
    })
    .addSecurityRequirements('bearer')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: '*'
  })

  const jwtAuthGuard = app.get(JwtAuthGuard)
  app.useGlobalGuards(jwtAuthGuard)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
