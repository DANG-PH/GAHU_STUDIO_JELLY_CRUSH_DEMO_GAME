import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameElement } from './game-element.entity';
import { GameLevel } from './game-level.entity';
import { GameService } from './game.service';
import { GameController } from './game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GameElement, GameLevel])],
  providers: [GameService],                  
  controllers: [GameController],           
  exports: [GameService],
})
export class GameModule {}
