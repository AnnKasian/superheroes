import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "node:path";

import { databaseConfig } from "../database.config.js";
import { SuperheroesModule } from "./modules/superheroes/superhero.module.js";

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      useFactory: (configService: ConfigService) => [
        {
          rootPath: path.join(import.meta.dirname, "..", "..", "public"),
          serveRoot: configService.get("SERVE_ROOT"),
        },
      ],
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    SuperheroesModule,
  ],
})
class AppModule {}

export { AppModule };
