// level.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import { Difficulty } from 'proto/game.pb';
import { BlockData } from './block_data.entity';
import { ObstacleData } from './obstacle_data.entity';
import { BlockGroupData } from './block_group_data.entity';

@Entity('level_data')
export class LevelData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column({ type: 'smallint' })
  difficulty: Difficulty;

  @Column()
  time_limit: number;

  @OneToMany(() => BlockData, block => block.level, { cascade: true })
  blocks: BlockData[];

  @OneToMany(() => ObstacleData, obstacle => obstacle.level, { cascade: true })
  obstacles: ObstacleData[];

  @OneToMany(() => BlockGroupData, group => group.level, { cascade: true })
  groups: BlockGroupData[];
}
