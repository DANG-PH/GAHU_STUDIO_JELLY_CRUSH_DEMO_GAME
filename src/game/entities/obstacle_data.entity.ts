import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObstacleType, Direction } from 'proto/game.pb';
import { LevelData } from './level_data.entity';

@Entity('obstacle_data')
export class ObstacleData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint' })
  type: ObstacleType;

  @Column({ type: 'smallint' })
  direction: Direction;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column({ type: 'json', nullable: true })
  meta: Record<string, string>;

  @ManyToOne(() => LevelData, level => level.obstacles, { onDelete: 'CASCADE' })
  level: LevelData;
}
