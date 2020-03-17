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
  seller_uuid: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(
    type => SellerOrder,
    sellerOrder => sellerOrder.seller,
  )
  sellerOrder: SellerOrder[];
}
