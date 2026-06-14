import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import helmet from "helmet";
import { Logger } from "nestjs-pino";
import { cleanupOpenApiDoc } from "nestjs-zod";

import { AppModule } from "./app.module";

// oxlint-disable-next-line func-style
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Required for better auth
    bufferLogs: true,
  });

  app.enableShutdownHooks();

  const openApiDoc = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle("NestJS Beginner Project")
      .setDescription("NestJS Beginner Project for learning purposes")
      .setVersion("1.0")
      .build()
  );

  SwaggerModule.setup("api/swagger", app, cleanupOpenApiDoc(openApiDoc));

  const configService: ConfigService = app.get(ConfigService);

  const NODE_ENV = configService.getOrThrow<string>("NODE_ENV");

  if (NODE_ENV === "production") {
    app.use(helmet());
  }

  const allowedOrigins = configService.getOrThrow("ALLOWED_ORIGINS");

  app.enableCors({
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: allowedOrigins,
  });

  app.useLogger(app.get(Logger));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
