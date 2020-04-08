import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, PrimaryGeneratedColumn, Index } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    addressId : number

    @Column()
    uuid : string

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

    @Index()
    @ManyToOne(type => User,{onUpdate:"CASCADE"})
    @JoinColumn({ name: "uuid"})
    user: User 
       
}
