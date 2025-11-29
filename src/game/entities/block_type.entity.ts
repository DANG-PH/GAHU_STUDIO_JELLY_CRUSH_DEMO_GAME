import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany,
} from 'typeorm';
import { BlockTypeMatrix } from './block_type_matrix.entity';

@Entity('block_type')
export class BlockType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column()
  name: string;

  @OneToMany(() => BlockTypeMatrix, matrix => matrix.blockType, { cascade: true, eager: true })
  cell_matrix: BlockTypeMatrix[];
}