import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MovieController } from './controllers/Movie.controller';
import { CreateConnectionMidleware } from './middleware/check-user.middleware';

@Module({
  controllers: [MovieController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreateConnectionMidleware)
      .forRoutes({ path: "/create", method: RequestMethod.POST })
  }
}
