import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './models/order/order.entity';
import { Repository, getRepository } from 'typeorm';
import { OrderDetail } from './models/order-detail/order-detail.entity';
import { FoodAndBev } from 'src/product-data/models/food-and-bev/food-and-bev.entity';
import { Electronic } from 'src/product-data/models/electronic/electronic.entity';
import { Furniture } from 'src/product-data/models/furniture/furniture.entity';

@Injectable()
export class ProductOrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
    ) { }

    async insertProductOrder(order: Order) {
        const selectOrder1 = await this.getProductOrderByUuid(order.uuid)
        if (selectOrder1.length > 0) {
            var orderDetail = new OrderDetail()
            orderDetail.productId = order.orderDetail[0].productId
            orderDetail.orderId = selectOrder1[0].orderId
            const orderDetailIsExist = await this.orderDetailRepository.find(orderDetail)
            if (orderDetailIsExist.length > 0) {
                orderDetailIsExist[0].quantity++
                await this.orderDetailRepository.save(orderDetailIsExist)
            }
            else {
                await this.orderDetailRepository.save(orderDetail)
            }
            this.updateProductOrderPrice(selectOrder1[0].orderId)
        }
        else if (selectOrder1.length == 0) {
            const insertOrder = await this.orderRepository.save(order)
            var orderDetail = new OrderDetail()
            orderDetail = order.orderDetail[0]
            orderDetail.orderId = insertOrder.orderId
            await this.orderDetailRepository.save(orderDetail)
            this.updateProductOrderPrice(insertOrder.orderId)
        }
    }

    async getProductOrderByUuid(uuid): Promise<any[]> {
        const selectProductOrder = await this.orderRepository.find({
            relations: ["orderDetail"],
            where: {
                uuid: uuid,
                orderStatus: 0
            }
        })

        return selectProductOrder
    }

    async getProductOrderById(orderId): Promise<any[]> {
        const selectProductOrder = await this.orderRepository.find({
            relations: ["orderDetail"],
            where: {
                orderId: orderId
            }
        })

        return selectProductOrder
    }

    async increaseOrderDetailQuantity(orderDetail: OrderDetail) {
        const orderDetailData = await this.orderDetailRepository.find(orderDetail)
        orderDetail.quantity = orderDetailData[0].quantity + 1
        await this.orderDetailRepository.save(orderDetail)
    }

    async decreaseOrderDetailQuantity(orderDetail: OrderDetail) {
        const orderDetailData = await this.orderDetailRepository.find(orderDetail)
        orderDetail.quantity = orderDetailData[0].quantity - 1
        await this.orderDetailRepository.save(orderDetail)
    }

    async updateProductOrderPrice(orderId) {
        var totalPrice = 0;
        const selectOrder = await this.getProductOrderById(orderId)
        for (var i = 0; i < selectOrder[0].orderDetail.length; i++) {
            const selectProductOrderDetail = await this.orderDetailRepository.find({
                relations: ["product"],
                where: {
                    orderId: selectOrder[0].orderDetail[i].orderId,
                    productId: selectOrder[0].orderDetail[i].productId
                }
            })

            const categoryId = selectProductOrderDetail[0].product.categoryId
            if (categoryId == 1) {
                const foodAndBevData = await getRepository(FoodAndBev).find({
                    where: {
                        foodAndBevId: selectProductOrderDetail[0].product.productId
                    }
                })
                console.log("each Price " + foodAndBevData[0].foodAndBevPrice)
                var totalFoodAndBevPrice = foodAndBevData[0].foodAndBevPrice * selectProductOrderDetail[0].quantity
                totalPrice += totalFoodAndBevPrice

            }
            else if (categoryId == 2) {
                const electronicData = await getRepository(Electronic).find({
                    where: {
                        electronicId: selectProductOrderDetail[0].product.productId
                    }
                })
                console.log("each Price " + electronicData[0].electronicPrice)
                var totalFoodAndBevPrice = electronicData[0].electronicPrice * selectProductOrderDetail[0].quantity
                totalPrice += totalFoodAndBevPrice

            }
            else if (categoryId == 3) {
                const furnitureData = await getRepository(Furniture).find({
                    where: {
                        furnitureId: selectProductOrderDetail[0].product.productId
                    }
                })
                console.log("each Price " + furnitureData[0].furniturePrice)
                var totalFoodAndBevPrice = furnitureData[0].furniturePrice * selectProductOrderDetail[0].quantity
                totalPrice += totalFoodAndBevPrice
            }
        }
        const selectProductOrder = await this.orderRepository.find({
            where: {
                orderId: selectOrder[0].orderId,
            }
        })
        var updateOrder = new Order()
        updateOrder = selectProductOrder[0]
        updateOrder.totalPrice = totalPrice
        console.log("totalPrice : " + totalPrice)
        console.log("update Total : " + updateOrder.totalPrice)
        await this.orderRepository.save(updateOrder)
    }

    async checkoutProductOrder(order: Order) {
        order.orderDateTime = null
        order.orderStatus = 1
        await this.orderRepository.save(order)
    }




}
