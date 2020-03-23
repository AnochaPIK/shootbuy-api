import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToOne,
  OneToMany,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { Seller } from 'src/user-data/models/seller/seller.entity';
import { Order } from '../order/order.entity';
import { Admin } from 'src/user-data/models/admin/admin.entity';

@Entity()
export class SellerOrder {
  @PrimaryColumn()
  sellerUuid: string;

  @PrimaryColumn()
  orderId: number;

  @Column()
  assignBy: string;

  @Column()
  assignDate: Date;

  @Column()
  finishDate: Date;

  @Column({ default: 0 })
  sellerOrderStatus: number;

  @Column({ type: 'text' })
  sellerOrderSignatureImage: string;

  @Index()
  @ManyToOne(type => Seller)
  @JoinColumn({ name: 'sellerUuid', referencedColumnName: 'sellerUuid' })
  seller: Seller;

  @Index()
  @OneToOne(type => Order)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'orderId' })
  order: Order;

  @Index()
  @ManyToOne(type => Admin)
  @JoinColumn({ name: 'assignBy', referencedColumnName: 'adminUuid' })
  admin: Admin;
}
