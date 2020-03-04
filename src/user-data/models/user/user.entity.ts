import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Address } from "../address/address.entity";
import { ScanHistory } from "../scan-history/scan-history.entity";

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

    @OneToMany(type => ScanHistory,scanHistory => scanHistory.user)
    scanHistory : ScanHistory[]
}
