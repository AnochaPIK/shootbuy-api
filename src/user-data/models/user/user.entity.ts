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
import { Address } from '../address/address.entity';
import { ScanHistory } from '../scan-history/scan-history.entity';
import { Order } from 'src/product-order/models/order/order.entity';

@Entity()
export class User {
  @PrimaryColumn()
  uuid: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: 1 })
  role: number;

  @OneToMany(
    type => Address,
    address => address.user,
  )
  address: Address[];

  @OneToMany(
    type => ScanHistory,
    scanHistory => scanHistory.user,
  )
  scanHistory: ScanHistory[];

  @OneToMany(
    type => Order,
    order => order.user,
  )
  order: Order[];
}
