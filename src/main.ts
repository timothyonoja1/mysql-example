import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // or "app.enableVersioning()"
  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The Example API description')
    .setVersion('1.0')
    .addTag('examples')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
