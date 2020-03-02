import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductDataModule } from './product-data/product-data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDataModule } from './user-data/user-data.module';
import { ProductOrderModule } from './product-order/product-order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProductDataModule,
    UserDataModule,
    ProductOrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
