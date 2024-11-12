import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Add global pipes
  app.useGlobalPipes(new ValidationPipe());
  
  // Enable CORS
  app.enableCors();
  
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3001;
  
  // Add debug logging
  console.log('Starting server with configuration:');
  console.log('Port:', port);
  console.log('MongoDB URI:', configService.get('database.uri'));
  
  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
bootstrap();