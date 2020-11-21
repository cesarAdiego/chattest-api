import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestContentModule } from './features/test-content/test-content.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/chattest'),
           TestContentModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
