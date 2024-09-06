import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);

  app.enableCors({
    origin: 'http://localhost:4000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  });

  const port = config.get<number>('API_PORT');
  await app.listen(port, () => {
    console.log(`app started on port: ${port}`);
  });
}
bootstrap();
