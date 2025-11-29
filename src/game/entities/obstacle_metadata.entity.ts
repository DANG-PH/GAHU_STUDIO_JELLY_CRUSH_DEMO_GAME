import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne
} from 'typeorm';
import { ObstacleData } from './obstacle_data.entity';

@Entity('obstacle_meta')
export class ObstacleMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;

  @ManyToOne(() => ObstacleData, obstacle => obstacle.meta)
  obstacle: ObstacleData;
}