import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Address } from "../address/address.entity";

@Entity()
export class User {
    @PrimaryColumn()
    email : string

    @Column()
    firstName : string

    @Column()
    lastName : string

    @OneToMany(type => Address,address => address.user)
    address: Address[]
}
