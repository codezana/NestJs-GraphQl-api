import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GqlBadRequestExceptionFilter } from './common/graphql-exception.filter';
import { FastifyAdapter, NestFastifyApplication, } from '@nestjs/platform-fastify';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.useGlobalFilters(new GqlBadRequestExceptionFilter());

  // 🔒 Security headers
  app.use(helmet());

    // // 🔒 Rate limiting
    // app.use(
    //   rateLimit({
    //     windowMs: 15 * 60 * 1000, // 15 minutes
    //     max: 100, // limit each IP
    //   }),
    // );


  // // 🌐 CORS
  // app.enableCors({
  //   origin: ['https://yourdomain.com'], // ✅ replace with trusted domains
  //   credentials: true,
  // });
  app.setGlobalPrefix('api'); // << REST will be under /api/*

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
