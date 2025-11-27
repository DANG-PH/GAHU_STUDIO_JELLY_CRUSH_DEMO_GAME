import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { GameLevel } from './game-level.entity';

// Enum (có thể tách file riêng nếu cần)
export enum ElementType {
  BLOCKER = 0,
  POLYOMINOS = 1,
  EMPTY = 2,
}

export enum ElementSubType {
  BOX_BLOCKER = 0,
  HYDRANT_BLOCKER = 1,
}

@Entity('game_elements')
export class GameElement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ElementType })
  elementType: ElementType;

  @Column({ type: 'enum', enum: ElementSubType })
  elementSubType: ElementSubType;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column({ type: 'json', nullable: true })
  elementProps: string;

  // Quan hệ nhiều element -> 1 level
  @ManyToOne(() => GameLevel, (level) => level.elements, {
    onDelete: 'CASCADE',
  })
  level: GameLevel;
}
