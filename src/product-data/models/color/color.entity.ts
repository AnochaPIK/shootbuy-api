import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Color {
    @PrimaryColumn({length:10})
    colorId:string

    @Column({length:10})
    colorName:string 
}
