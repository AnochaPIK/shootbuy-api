import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDataService } from './product-data.service';
import { ProductDataController } from './product-data.controller';
import { Category } from './models/category/category.entity';
import { Color } from './models/color/color.entity';
import { Electronic } from './models/electronic/electronic.entity';
import { FoodAndBev } from './models/food-and-bev/food-and-bev.entity';
import { Furniture } from './models/furniture/furniture.entity';
import { Product } from './models/product/product.entity';
import { User } from './models/user/user.entity';
import { Address } from './models/address/address.entity';
import { Order } from './models/order/order.entity';
import { OrderDetail } from './models/order-detail/order-detail.entity';
import { ScanHistory } from './models/scan-history/scan-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category,Color,Electronic,FoodAndBev,Furniture,Product,User,Address,Order,OrderDetail,ScanHistory])], 
  providers: [ProductDataService],
  controllers: [ProductDataController]
})
export class ProductDataModule {} 
