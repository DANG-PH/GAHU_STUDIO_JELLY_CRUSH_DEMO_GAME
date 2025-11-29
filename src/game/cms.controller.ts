import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CMSService
    
 } from './cms.service';
import type {
  GetAllElementDefaultRequest,
  GetAllElementDefaultResponse,
  SetElementDefaultRequest,
  SetElementDefaultResponse,
  CreateLevelRequest,
  CreateLevelResponse,
} from 'proto/game.pb';

import { CMS_SERVICE_NAME } from 'proto/game.pb';

@Controller()
export class CMSController {
  constructor(private readonly cmsService: CMSService) {}

  @GrpcMethod(CMS_SERVICE_NAME, 'GetAllElementDefault')
  async getAllElementDefault(data: GetAllElementDefaultRequest): Promise<GetAllElementDefaultResponse> {
    return await this.cmsService.getAllElementDefault(data.elementType);
  }

  @GrpcMethod(CMS_SERVICE_NAME, 'SetElementDefault')
  async setElementDefault(data: SetElementDefaultRequest): Promise<SetElementDefaultResponse> {
    const key = data.elementType;
    // Chọn giá trị nào có dữ liệu
    const value = data.blocks ?? data.obstacles;
    if (!value) {
      throw new Error('No data provided for SetElementDefault');
    }
    return await this.cmsService.setElementDefault(key, value);
  }

  @GrpcMethod(CMS_SERVICE_NAME, 'CreateLevel')
  async createLevel(data: CreateLevelRequest): Promise<CreateLevelResponse> {
    if (!data.levelData) {
      throw new Error('LevelData is required');
    }
    return await this.cmsService.createLevel(data.levelData);
  }
}
