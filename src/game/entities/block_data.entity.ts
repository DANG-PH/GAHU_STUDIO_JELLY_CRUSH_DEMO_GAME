// block.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn,
} from 'typeorm';
import { LevelData } from './level_data.entity';
import { BlockGimmickData } from './block_gimmick_data.entity';
import { ColorType } from 'proto/game.pb';

@Entity('block_data')
export class BlockData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column({ type: 'smallint' })
  color: ColorType;

  @Column()
  x: number;

  @Column()
  y: number;

  @ManyToOne(() => LevelData, level => level.blocks)
  level: LevelData;

  @ManyToOne(() => BlockGimmickData, gimmick => gimmick.blocks, { nullable: true })
  gimmick?: BlockGimmickData;
}
