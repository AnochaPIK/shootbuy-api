import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { Color } from "../color/color.entity";
import { Product } from "../product/product.entity";

@Entity()
export class Furniture {
    @PrimaryColumn({ length: 10 })
    furnitureId: string

    @Column({ length: 50 })
    furnitureBrand: string

    @Column({ length: 100, default: null })
    furnitureModel: string

    @Column({ type: "text", default: null })
    furnitureImage: string

    @Column({default:0})
    furniturePrice: number

    @Column({ length: 30 })
    furnitureSize: string

    @Column({ type: "text", default: null })
    furnitureDetail: string

    @Column({default:0})
    furnitureAmount: number

    @ManyToMany(type => Color,{onUpdate:"CASCADE"})
    @JoinTable({
        name: "furniture_color",
        joinColumn:{
            name:"furnitureId"
        },
        inverseJoinColumn:{
            name:"colorId"
        }
    })
    color: Color[]

}
