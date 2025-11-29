// game.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameService } from './game.service';
import { GameController } from './game.controller';

import { LevelData } from './entities/level_data.entity';
import { BlockData } from './entities/block_data.entity';
import { BlockGimmickData } from './entities/block_gimmick_data.entity';
import { BlockGroupData } from './entities/block_group_data.entity';
import { BlockType } from './entities/block_type.entity';
import { BlockTypeMatrix } from './entities/block_type_matrix.entity';
import { ObstacleData } from './entities/obstacle_data.entity';
import { ObstacleMeta } from './entities/obstacle_metadata.entity';
import { ObstacleDataDefault } from './entities/obstacle_type.entity';
import { CMSController } from './cms.controller';
import { CMSService } from './cms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LevelData,
      BlockData,
      BlockGimmickData,
      BlockGroupData,
      BlockType,
      BlockTypeMatrix,
      ObstacleData,
      ObstacleMeta,
      ObstacleDataDefault,
    ]),
  ],
  controllers: [GameController, CMSController],
  providers: [GameService, CMSService],
  exports: [GameService],
})
export class GameModule {}
