import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './models/order/order.entity';
import { Repository } from 'typeorm';
import { OrderDetail } from './models/order-detail/order-detail.entity';

@Injectable()
export class ProductOrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
    ) { }
}
