import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { GameService } from './game.service';
import { GAME_LEVEL_SERVICE_NAME } from 'proto/game.pb';
import type { FindLevelRequest, FindLevelResponse, CreateLevelRequest, CreateLevelResponse } from 'proto/game.pb';

@Controller()
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  @GrpcMethod(GAME_LEVEL_SERVICE_NAME, 'FindLevel')
  async register(data: FindLevelRequest): Promise<FindLevelResponse> {
    return this.gameService.findLevel(data);
  }

  @GrpcMethod(GAME_LEVEL_SERVICE_NAME, 'CreateLevel')
  async getProfile(data: CreateLevelRequest) : Promise<CreateLevelResponse> {
    return this.gameService.createLevel(data);
  }
}