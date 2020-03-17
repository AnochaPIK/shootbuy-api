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
import { Seller } from 'src/user-data/models/seller/seller.entity';
import { Order } from '../order/order.entity';

@Entity()
export class SellerOrder {
  @PrimaryColumn()
  seller_uuid: string;

  @PrimaryColumn()
  orderId: number;

  @Column({ default: 0 })
  sellerOrderStatus: number;

  @Index()
  @ManyToOne(type => Seller)
  @JoinColumn({ name: 'seller_uuid', referencedColumnName: 'seller_uuid' })
  seller: Seller;

  @Index()
  @OneToOne(type => Order)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'orderId' })
  order: Order;
}
