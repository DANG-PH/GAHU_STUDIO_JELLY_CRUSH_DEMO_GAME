import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GameElement } from './game-element.entity';

@Entity('game_levels')
export class GameLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gameName: string;

  @Column()
  gameId: string;

  @Column()
  levelId: string;

  @Column()
  cols: number;

  @Column()
  rows: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Quan hệ với element
  @OneToMany(() => GameElement, (element) => element.level, {
    cascade: true,
    eager: true,
  })
  elements: GameElement[];
}
