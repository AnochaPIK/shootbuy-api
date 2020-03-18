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
import { Tile } from './models/tile/tile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category,Color,Electronic,FoodAndBev,Furniture,Product,Tile])], 
  providers: [ProductDataService],
  controllers: [ProductDataController]
})
export class ProductDataModule {} 
