import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Product } from '../product/product.entity';
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column({ length: "50" }) 
    categoryName: string; 

    @OneToMany(type => Product, product => product.category)
    product: Product[];

}
