import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GameService } from './game.service';
import type {
  GetDataLevelRequest,
  GetDataLevelResponse,
  GetMatrixRequest,
  GetMatrixResponse,
  Matrix2D,
} from 'proto/game.pb';
import { GAME_SERVICE_NAME } from 'proto/game.pb';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @GrpcMethod(GAME_SERVICE_NAME, 'GetDataLevel')
  async getDataLevel(data: GetDataLevelRequest): Promise<GetDataLevelResponse> {
    const levelData = await this.gameService.getDataLevel(data.id);
    return { levelData: levelData };
  }

  @GrpcMethod(GAME_SERVICE_NAME, 'GetMatrix')
  async getMatrix(data: GetMatrixRequest): Promise<GetMatrixResponse> {
    const matrix: Matrix2D[] = await this.gameService.getMatrix(data.type);
    return { matrix };
  }
}