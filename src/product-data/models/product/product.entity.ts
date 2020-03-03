import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne } from "typeorm";
import { Category} from "../category/category.entity"
import { type } from "os";
import { FoodAndBev } from "../food-and-bev/food-and-bev.entity";
import { Furniture } from "../furniture/furniture.entity";
import { Electronic } from "../electronic/electronic.entity";
@Entity()
export class Product {
    @PrimaryColumn({ length: 10 })
    productId: string

    @Column()
    categoryId:number
    
    @ManyToOne(type => Category,{onUpdate:"CASCADE"})
    @JoinColumn({ name: "categoryId"})
    category: Category 
}
