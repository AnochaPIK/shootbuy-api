import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { Color } from "../color/color.entity";
import { Product } from "../product/product.entity";

@Entity()
export class Electronic {
    @PrimaryColumn({ length: 10 })
    electronicId: string

    @Column({ length: 50 })
    electronicBrand: string

    @Column({ length: 100, default: null })
    electronicModel: string

    @Column({ type: "text", default: null })
    electronicImage: string

    @Column({default:0})
    electronicPrice: number

    @Column({ type: "text", default: null })
    electronicSpec: string

    @Column({default:0})
    electronicAmount: number

    @ManyToMany(type => Color,{onUpdate:"CASCADE"})
    @JoinTable({
        name: "electronic_color",
        joinColumn:{
            name:"electronicId"
        },
        inverseJoinColumn:{
            name:"colorId"
        }
    })
    color: Color[]
}
