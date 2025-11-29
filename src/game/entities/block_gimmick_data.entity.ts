import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { BlockGimmickType } from 'proto/game.pb';
import { BlockData } from './block_data.entity';

@Entity('block_gimmick_data')
export class BlockGimmickData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  type: BlockGimmickType;

  @Column()
  count: number;

  @OneToMany(() => BlockData, block => block.gimmick, {
    cascade: true,
  })
  blocks: BlockData[];
}
