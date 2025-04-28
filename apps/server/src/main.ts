import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  app.enableCors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  });

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
