import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, ManyToMany, JoinTable, Index } from "typeorm";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";

@Entity()
export class ScanHistory {
    @PrimaryColumn()
    email : string

    @Index()
    @ManyToOne(type => User,{onUpdate:"CASCADE"})
    @JoinColumn({name : "email",referencedColumnName:"email"}) 
    user : User

    @PrimaryColumn({length:10})
    productId : string

    @Index()
    @ManyToOne(type => Product,{onUpdate:"CASCADE"})
    @JoinColumn({name : "productId",referencedColumnName:"productId"})
    product : Product
    
    @Column({type:'datetime'})
    scanDateTime : Date
}
