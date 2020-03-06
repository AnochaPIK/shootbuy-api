import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, ManyToMany, JoinTable, Index, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Product } from "src/product-data/models/product/product.entity";

@Entity()
export class ScanHistory {
    @PrimaryColumn()
    uuid : string

    @Index()
    @ManyToOne(type => User,{onUpdate:"CASCADE"}) 
    @JoinColumn({name : "uuid",referencedColumnName:"uuid"}) 
    user : User

    @PrimaryColumn({length:10})
    productId : string

    @Index()
    @ManyToOne(type => Product,{onUpdate:"CASCADE"}) 
    @JoinColumn({name : "productId",referencedColumnName:"productId"})
    product : Product
    
    @Column({type:'timestamp'})
    scanDateTime : Date
}
