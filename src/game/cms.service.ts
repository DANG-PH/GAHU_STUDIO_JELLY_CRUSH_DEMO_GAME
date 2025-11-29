import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ElementType,
  BlockType as BlockTypeProto,
  ObstacleDataDefault as ObstacleDataDefaultProto,
  LevelData as LevelProto
} from 'proto/game.pb';

import { BlockType } from './entities/block_type.entity';
import { ObstacleDataDefault } from './entities/obstacle_type.entity';
import { LevelData } from './entities/level_data.entity';

@Injectable()
export class CMSService {
  constructor(
    @InjectRepository(BlockType)
    private readonly blockTypeRepo: Repository<BlockType>,

    @InjectRepository(ObstacleDataDefault)
    private readonly obstacleRepo: Repository<ObstacleDataDefault>,

    @InjectRepository(LevelData)
    private readonly levelRepo: Repository<LevelData>,
  ) {}

  async getAllElementDefault(elementType: ElementType) {
    if (elementType === ElementType.Block) {
      const blocks = await this.blockTypeRepo.find({ relations: ['cell_matrix'] });
      return { blocks: { items: blocks } };
    } else if (elementType === ElementType.Obstacle) {
      const obstacles = await this.obstacleRepo.find();
      return { obstacles: { items: obstacles } };
    }
    throw new NotFoundException('Element type not found');
  }

  async setElementDefault(elementType: ElementType, data: BlockTypeProto | ObstacleDataDefaultProto) {
    if (elementType === ElementType.Block) {
      const block = this.blockTypeRepo.create(data as BlockTypeProto);
      await this.blockTypeRepo.save(block);
    } else if (elementType === ElementType.Obstacle) {
      const obs = this.obstacleRepo.create(data as ObstacleDataDefaultProto);
      await this.obstacleRepo.save(obs);
    } else {
      throw new NotFoundException('Element type not found');
    }
    return { success: true };
  }

  async createLevel(levelData: LevelProto) {
    const level = this.levelRepo.create(levelData as LevelData);
    await this.levelRepo.save(level);
    return { success: true };
  }
}
