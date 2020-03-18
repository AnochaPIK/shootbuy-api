import { Module } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { ProductOrderController } from './product-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/order/order.entity';
import { OrderDetail } from './models/order-detail/order-detail.entity';
import { SellerOrder } from './models/seller-order/seller-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderDetail,SellerOrder])], 
  providers: [ProductOrderService],
  controllers: [ProductOrderController]
})
export class ProductOrderModule {}
