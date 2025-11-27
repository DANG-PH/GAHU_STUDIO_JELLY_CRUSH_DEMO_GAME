import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameElement } from './game-element.entity';
import { GameLevel } from './game-level.entity';
import { RpcException } from '@nestjs/microservices';
import { GAME_LEVEL_SERVICE_NAME } from 'proto/game.pb';
import type { FindLevelRequest, FindLevelResponse, CreateLevelRequest, CreateLevelResponse } from 'proto/game.pb';
import { status } from '@grpc/grpc-js';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameLevel)
    private readonly gameLevelRepository: Repository<GameLevel>,

    @InjectRepository(GameElement)
    private readonly gameElementRepository: Repository<GameElement>,
    
  ) {}

async findLevel(data: FindLevelRequest): Promise<FindLevelResponse> {
    const level = await this.gameLevelRepository.findOne({
      where: { levelId: data.levelId },
      relations: ['elements'],
    });

    if (!level) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Level ${data.levelId} not found`,
      });
    }

    return {
      levelData: this.mapEntityToProto(level),
    };
  }

  async createLevel(data: CreateLevelRequest): Promise<CreateLevelResponse> {
    const levelData = data.levelData!;

    const level = this.gameLevelRepository.create({
      gameName: levelData.gameName,
      gameId: levelData.gameId,
      levelId: levelData.levelId,
      cols: levelData.cols,
      rows: levelData.rows,
      elements: (levelData.elements?.map(el =>
        this.gameElementRepository.create({
            elementType: el.elementType as any,
            elementSubType: el.elementSubType as any,
            width: el.width,
            height: el.height,
            elementProps: typeof el.elementProps === 'object'
                          ? JSON.stringify(el.elementProps)
                          : el.elementProps || '{}'
        })
        ) as GameElement[]) || [],
    });

    const savedLevel = await this.gameLevelRepository.save(level);

    return {
      success: true,
      message: 'Level created successfully',
      levelData: this.mapEntityToProto(savedLevel),
    };
  }

  private mapEntityToProto(level: GameLevel) {
    return {
      gameName: level.gameName,
      gameId: level.gameId,
      levelId: level.levelId,
      cols: level.cols,
      rows: level.rows,
      elements: level.elements.map(el => ({
        elementType: el.elementType,
        elementSubType: el.elementSubType,
        width: el.width,
        height: el.height,
        elementProps: (() => {
          try {
            return el.elementProps;  // parse string JSON thành object
          } catch {
            return "test"; // fallback nếu DB có dữ liệu lỗi
          }
        })(),
      })),
    };
  }
}
