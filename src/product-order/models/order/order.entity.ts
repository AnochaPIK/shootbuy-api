import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user-data/models/user/user.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId : number

    @ManyToOne(type => User,{onUpdate:"CASCADE"})
    @JoinColumn({ name: "email"})
    user: User 

    @Column({type:'datetime'})
    orderDateTime : Date

    @Column()
    totalPrice : number

    @Column()
    orderStatus : number

}
