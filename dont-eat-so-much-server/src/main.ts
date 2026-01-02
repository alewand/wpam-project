import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });
  app.useLogger(["log", "error", "warn", "debug", "verbose"]);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
