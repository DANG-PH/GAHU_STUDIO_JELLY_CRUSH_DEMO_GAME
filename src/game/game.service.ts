// game.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LevelData } from './entities/level_data.entity';
import { BlockType } from './entities/block_type.entity';
import { BlockTypeMatrix } from './entities/block_type_matrix.entity';
import { LevelData as levelProto } from 'proto/game.pb';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(LevelData)
    private readonly levelRepo: Repository<LevelData>,

    @InjectRepository(BlockType)
    private readonly blockTypeRepo: Repository<BlockType>,

    @InjectRepository(BlockTypeMatrix)
    private readonly matrixRepo: Repository<BlockTypeMatrix>,
  ) {}

  async getDataLevel(id: number): Promise<LevelData> {
    const level = await this.levelRepo.findOne({
      where: { id },
    });

    if (!level) {
      throw new RpcException({status: status.NOT_FOUND, message: "k tim thay level"});
    }

    console.log("hello1")

    return level;
  }

  async getMatrix(type: number): Promise<BlockTypeMatrix[]> {
    const blockType = await this.blockTypeRepo.findOne({
      where: { type: type },
    });

    if (!blockType) {
      throw new RpcException({status: status.NOT_FOUND, message: "k tim thay blocktype"});
    }
    return blockType.cell_matrix;
  }
}
