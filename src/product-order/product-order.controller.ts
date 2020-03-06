import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { Order } from './models/order/order.entity';
import { OrderDetail } from './models/order-detail/order-detail.entity';

@Controller('product-order')
export class ProductOrderController {
    constructor(private productOrderService:ProductOrderService){}

    @Post("insertProductOrder")
    insertProductOrder(@Body() order:Order){
        return this.productOrderService.insertProductOrder(order)
    }

    @Get("getProductOrderByUuid/:uuid")
    getProductOrder(@Param() params) : Promise<any[]>{
        return this.productOrderService.getProductOrderByUuid(params.uuid)
    }

    @Post("increaseOrderDetailQuantity")
    increaseOrderDetailQuantity(@Body() orderDetail:OrderDetail){
        return this.productOrderService.increaseOrderDetailQuantity(orderDetail)
    }

    @Post("decreaseOrderDetailQuantity")
    decreaseOrderDetailQuantity(@Body() orderDetail:OrderDetail){
        return this.productOrderService.decreaseOrderDetailQuantity(orderDetail)
    }

    @Post("checkoutProductOrder")
    checkoutProductOrder(@Body() order:Order){
        return this.productOrderService.checkoutProductOrder(order)
    }
    
}
