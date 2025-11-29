import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany,
} from 'typeorm';
import { BlockType } from './block_type.entity';

@Entity('block_type_matrix')
export class BlockTypeMatrix {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BlockType, bt => bt.cell_matrix)
  blockType: BlockType;

  @Column()
  cols: number;

  @Column()
  rows: number;

  @Column('simple-json')
  values: number[];
}
