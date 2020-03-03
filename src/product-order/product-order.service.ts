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

    async insertProductOrder(order: Order) {
        const selectOrder = await this.getProductOrder(order.email)
        if (selectOrder.length > 0) {
            var orderDetail = new OrderDetail()
            orderDetail = order.orderDetail[0]
            orderDetail.orderId = selectOrder[0].orderId
            const insertOrderDetail = await this.orderDetailRepository.save(orderDetail)
        }
        else if (selectOrder.length == 0) {
            const insertOrder = await this.orderRepository.save(order)
            var orderDetail = new OrderDetail()
            orderDetail = order.orderDetail[0]
            orderDetail.orderId = insertOrder.orderId
            const insertOrderDetail = await this.orderDetailRepository.save(orderDetail)
        }
    }

    async getProductOrder(email) : Promise<any[]>{
        const selectProductOrder = await this.orderRepository.find({
            relations: ["orderDetail"],
            where: {
                email: email,
                orderStatus: 0
            }
        })
        return selectProductOrder
    }




}
