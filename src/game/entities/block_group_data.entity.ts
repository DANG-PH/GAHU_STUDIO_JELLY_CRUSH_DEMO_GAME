import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne
} from 'typeorm';
import { LevelData } from './level_data.entity';

@Entity('block_group_data')
export class BlockGroupData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LevelData, level => level.groups)
  level: LevelData;

  @Column({ type: 'simple-json', nullable: true })
  indexes: number[];
}