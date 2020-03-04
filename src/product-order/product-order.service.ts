import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './models/order/order.entity';
import { Repository, getRepository } from 'typeorm';
import { OrderDetail } from './models/order-detail/order-detail.entity';
import { FoodAndBev } from 'src/product-data/models/food-and-bev/food-and-bev.entity';

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
            const orderDetailIsExist = await this.orderDetailRepository.find(orderDetail)
            if (orderDetailIsExist.length > 0) {
                orderDetailIsExist[0].quantity++

                await this.orderDetailRepository.save(orderDetailIsExist)
            }
            else{
                await this.orderDetailRepository.save(orderDetail)
            }
            
            console.log( selectOrder[0].orderDetail)


            





            // const selectProductOrderDetail = await this.orderDetailRepository.find({
            //     relations: ["product"],
            //     where: {
            //         orderId: orderDetail.orderId,
            //         productId: orderDetail.productId
            //     }
            // })
            // const categoryId = selectProductOrderDetail[0].product.categoryId
            // if (categoryId == 1) {
            //     const foodAndBevData = await getRepository(FoodAndBev).find({
            //         where: {
            //             foodAndBevId: selectProductOrderDetail[0].product.productId
            //         }
            //     })
            //     var totalFoodAndBevPrice = foodAndBevData[0].foodAndBevPrice * selectProductOrderDetail[0].quantity
            //     const selectProductOrder = await this.orderRepository.find({
            //         where: {
            //             orderId: selectOrder[0].orderId,
            //         }
            //     })
            //     var updateOrder = new Order()
            //     updateOrder = selectProductOrder[0]
            //     updateOrder.totalPrice += totalFoodAndBevPrice
            //     await this.orderRepository.save(updateOrder)

            // }
            // else if (categoryId == 2) {

            // }
            // else if (categoryId == 3) {

            // }
        }
        else if (selectOrder.length == 0) {
            const insertOrder = await this.orderRepository.save(order)
            var orderDetail = new OrderDetail()
            orderDetail = order.orderDetail[0]
            orderDetail.orderId = insertOrder.orderId
            const insertOrderDetail = await this.orderDetailRepository.save(orderDetail)
        }
    }

    async getProductOrder(email): Promise<any[]> {
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
