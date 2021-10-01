import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app/app.module';
import * as helmet from 'helmet';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'app/config/config';

async function bootstrap() {

// platfrom specific, this can be change to express or any other 
///node framework, but we choose Fastify because the way 
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({logger: true}),
  );

  let PORT: number = 80;
  if (process.env.NODE_ENV === 'development') {
        // set the port to docker generate port for local and staging build 
        PORT = config.web.port;
  }

  //ensure swagger docs doesn't show up on production
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
    const documentOptions = new DocumentBuilder()
      .setTitle('CountryDirectory Service')
      .setDescription('country-directory service')
      .setVersion('v1')
      .build();
    const document = SwaggerModule.createDocument(app, documentOptions);
    SwaggerModule.setup('api', app, document);
}

  app.enableCors({
      origin: ['http://localhost:3000', '*', '/\.localhost:3000.com$/']},
  );
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');
  app.listen(PORT, '0.0.0.0');
}
bootstrap();
