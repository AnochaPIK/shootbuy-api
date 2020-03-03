import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    addressId : number

    @Column()
    email : string

    @Column()
    addressNumber : string
    
    @Column()
    district : string

    @Column()
    subDistrict : string
     
    @Column()
    province : string
    
    @Column()
    zipCode : string

    @ManyToOne(type => User,{onUpdate:"CASCADE"})
    @JoinColumn({ name: "email"})
    user: User 
       
}
