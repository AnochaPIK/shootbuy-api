import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { SellerOrder } from 'src/product-order/models/seller-order/seller-order.entity';

@Entity()
export class Seller {
  @PrimaryColumn()
  sellerUuid: string;

  @Column()
  sellerEmail: string;

  @Column()
  sellerFirstName: string;

  @Column()
  sellerLastName: string;

  @OneToMany(
    type => SellerOrder,
    sellerOrder => sellerOrder.seller,
  )
  sellerOrder: SellerOrder[];
}
