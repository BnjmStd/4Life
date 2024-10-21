import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { 
  SwaggerModule, 
  DocumentBuilder 
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Data4Life Api Documentation')
    .setDescription('CRUD ... ')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: '*'
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
