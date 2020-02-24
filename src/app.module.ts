import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductDataModule } from './product-data/product-data.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProductDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
