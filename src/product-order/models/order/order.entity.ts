import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "src/user-data/models/user/user.entity";
import { OrderDetail } from "../order-detail/order-detail.entity";
import { Address } from "src/user-data/models/address/address.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId : number

    @Column()
    uuid : string

    @Column({default:null})
    addressId : number

    @ManyToOne(type => User,{onUpdate:"CASCADE"})
    @JoinColumn({ name: "uuid"})
    user: User 

    @Column({type:"timestamp"})
    orderDateTime : string

    @Column({default : 0})
    totalPrice : number

    @Column({default : 0})
    orderStatus : number

    @OneToMany(type => OrderDetail,orderDetail => orderDetail.order)
    orderDetail: OrderDetail[]


}
