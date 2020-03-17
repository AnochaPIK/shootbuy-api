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
  tileTexture: string;

  @Column({})
  tilePattern: string;

  @Column({})
  tileSize: string;

  @Column({ type: 'double' })
  tilePricePerSquareMeter: number;

  @Column({ type: 'double' })
  tileSquareMeterPerUnit: number;

  @Column({})
  tileQuantityPerUnit: number;

  @Column({ type: 'double' })
  tileQuantityPerSquareMeter: number;

  @Column({ type: 'double' })
  tilePricePerBox: number;
}
