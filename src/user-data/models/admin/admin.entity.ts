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
export class Admin {
  @PrimaryColumn()
  adminUuid: string;

  @Column()
  adminEmail: string;

  @Column()
  adminFirstName: string;

  @Column()
  adminLastName: string;

  @OneToMany(
    type => SellerOrder,
    sellerOrder => sellerOrder.admin,
  )
  sellerOrder: SellerOrder[];
}
