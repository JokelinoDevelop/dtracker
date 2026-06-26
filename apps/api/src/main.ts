import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import helmet from "helmet";
import { Logger } from "nestjs-pino";
import { cleanupOpenApiDoc } from "nestjs-zod";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
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

  app.use(helmet());

  const configService: ConfigService = app.get(ConfigService);

  const allowedOrigins = configService.getOrThrow("ALLOWED_ORIGINS");

  app.enableCors({
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    origin: allowedOrigins,
  });

  app.useLogger(app.get(Logger));

  // By setting the trust proxy setting on the Express API, it automatically tells Express to trust the X-Forwarded-For header and parse it to an array, storing it in the request object in its ips array (i.e., req.ips).
  app.set("trust proxy", true);

  await app.listen(process.env.PORT ?? 3000);

  if (import.meta.webpackHot) {
    import.meta.webpackHot.accept();
    import.meta.webpackHot.dispose(() => app.close());
  }
}

bootstrap();
