import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { Order } from './models/order/order.entity';

@Controller('product-order')
export class ProductOrderController {
    constructor(private productOrderService:ProductOrderService){}

    @Post("insertProductOrder")
    insertProductOrder(@Body() order:Order){
        return this.productOrderService.insertProductOrder(order)
    }

    @Get("getProductOrder/:email")
    getProductOrder(@Param() params) : Promise<any[]>{
        return this.productOrderService.getProductOrder(params.email)
    }
}
