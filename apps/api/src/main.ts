import helmet from "helmet";
import { SwaggerTheme } from "swagger-themes";

import { Logger, ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  if (process.env.NODE_ENV === "production") {
    app.enableCors({
      origin: "https://ph-fe.apps.naimulhaque.com",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
    });
  }

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1"
  });
  const config = new DocumentBuilder()
    .setTitle("progHours")
    .setDescription("progHours API documentation")
    .setVersion("0.3.0")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "JWT"
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme("v3");

  SwaggerModule.setup("api/docs", app, document, {
    customSiteTitle: "progHours - API Docs",
    customCss: theme.getBuffer("flattop"),
    swaggerOptions: {
      displayRequestDuration: true
    }
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();
