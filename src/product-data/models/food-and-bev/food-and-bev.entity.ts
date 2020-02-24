import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { type } from 'os';
import { Product } from '../product/product.entity';

@Entity()
export class FoodAndBev {
    @PrimaryColumn({length:10})
    foodAndBevId:string

    @Column({length:50})
    foodAndBevBrand:string

    @Column({length:100})
    foodAndBevModel:string

    @Column({type:"text",default:null})
    foodAndBevImage:string

    @Column({length:10})
    foodAndBevSize:string

    @Column({default:0})
    foodAndBevPrice:number

    @Column({length:5,default:0})
    foodAndBevCal:string

    @Column({length:5,default:0})
    foodAndBevSugar:string

    @Column({length:5,default:0})
    foodAndBevFat:string

    @Column({length:5,default:0})
    foodAndBevSodium:string 

    @Column({default:0})
    foodAndBevAmount:number
}
