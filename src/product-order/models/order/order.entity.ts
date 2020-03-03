import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "src/user-data/models/user/user.entity";
import { OrderDetail } from "../order-detail/order-detail.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId : number

    @Column()
    email : string

    @ManyToOne(type => User,{onUpdate:"CASCADE"})
    @JoinColumn({ name: "email"})
    user: User 

    @Column({type:"timestamp"})
    orderDateTime : Date

    @Column({default : 0})
    totalPrice : number

    @Column({default : 0})
    orderStatus : number

    @OneToMany(type => OrderDetail,orderDetail => orderDetail.order)
    orderDetail: OrderDetail[]

}
