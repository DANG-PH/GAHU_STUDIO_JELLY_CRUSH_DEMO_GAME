import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany,
} from 'typeorm';
import { ObstacleType } from 'proto/game.pb';

@Entity('obstacle_data_default')
export class ObstacleDataDefault {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  type: ObstacleType;
}