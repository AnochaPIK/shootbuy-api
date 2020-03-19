import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Tile {
  @PrimaryColumn({})
  tileId: string;

  @Column({})
  tileBrand: string;

  @Column({})
  tileModel: string;

  @Column({})
  tileSize: string;

  @Column({ type: 'double' })
  tileKgsPerCtn: number;

  @Column({ type: 'double' })
  tileSquareMeterPerCtn: number;

  @Column({ type: 'double' })
  tileSquareFTPerCtn: number;

  @Column({ type: 'double' })
  tileQuantity: number;

  @Column({ type: 'double' })
  tilePrice: number;

  @Column({ type: 'text'})
  tileImage: string;
}
