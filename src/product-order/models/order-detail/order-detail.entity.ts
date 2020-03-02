import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, ManyToMany, JoinTable, Index } from "typeorm";
import { type } from "os";
import { Order } from "../order/order.entity";
import { Product } from "src/product-data/models/product/product.entity";

@Entity()
export class OrderDetail {
    
    @PrimaryColumn()
    orderId : number

    @Index()
    @ManyToOne(type => Order,{onUpdate:"CASCADE"})
    @JoinColumn({name : "orderId",referencedColumnName:"orderId"}) 
    order : Order

    @PrimaryColumn({length:10})
    productId : string

    @Index()
    @ManyToOne(type => Product,{onUpdate:"CASCADE"})
    @JoinColumn({name : "productId",referencedColumnName:"productId"})
    product : Product
    
    @Column()
    quantity : number
    
}
