import { type CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: configService.get<string>("REDIS_HOST"),
        port: Number.parseInt(
          configService.get<string>("REDIS_PORT") as string,
        ),
      },
    });

    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};

export { RedisOptions };
