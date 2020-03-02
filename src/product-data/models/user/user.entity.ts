import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    email : string

    @Column()
    firstName : string

    @Column()
    lastName : string
}
