import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './models/category/category.entity';
import { Repository } from 'typeorm';
import { Color } from './models/color/color.entity';
import { Electronic } from './models/electronic/electronic.entity';
import { FoodAndBev } from './models/food-and-bev/food-and-bev.entity';
import { Furniture } from './models/furniture/furniture.entity';
import { Product } from './models/product/product.entity';
import { User } from './models/user/user.entity';
import { Address } from './models/address/address.entity';
import { OrderDetail } from './models/order-detail/order-detail.entity';
import { Order } from './models/order/order.entity';
import { ScanHistory } from './models/scan-history/scan-history.entity';

@Injectable()
export class ProductDataService { 
    constructor(
        @InjectRepository(Category) private categoryRepository : Repository<Category>,
        @InjectRepository(Color) private colorRepository : Repository<Color>,
        @InjectRepository(Electronic) private electronicRepository : Repository<Electronic>,
        @InjectRepository(FoodAndBev) private foodAndBevRepository : Repository<FoodAndBev>,
        @InjectRepository(Furniture) private furnitureRepository : Repository<Furniture>,
        @InjectRepository(Product) private productRepository : Repository<Product>,
        @InjectRepository(User) private userRepository : Repository<User>,
        @InjectRepository(Address) private addressRepository : Repository<Address>,
        @InjectRepository(Order) private orderRepository : Repository<Order>,
        @InjectRepository(OrderDetail) private orderDetailRepository : Repository<OrderDetail>,
        @InjectRepository(ScanHistory) private scanHistoryRepository : Repository<ScanHistory>,
    ){}

    async selectProductType(label): Promise<Product[]> {
        const query = await this.productRepository.find({
            relations:["category"],
            where:{
                productId : label
            }
        })
        // console.log("Salmon",await this.productRepository.createQueryBuilder().getSql())
        // const select = await this.ProductRepository.createQueryBuilder("product").innerJoinAndSelect("product.category","category").where(`product.productId = :label`,{label : label}).getMany()
        return query
    }

    async selectProductFoodData(label): Promise<any[]>{
        const query = await this.foodAndBevRepository.find({
            where:{
                foodAndBevId : label 
            }
        })
        return query
    }

    async selectProductFurniture(label): Promise<any[]>{
        const query = await this.furnitureRepository.find({
            relations:["color"],
            where:{
                furnitureId : label 
            }
        })
        return query
    }

    async selectProductElectronic(label): Promise<any[]>{
        const query = await this.electronicRepository.find({
            relations:["color"],
            where:{
                electronicId : label 
            }
        })
        return query
    }


}
