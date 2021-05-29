import {Controller, Get} from '@nestjs/common';
import {SvgLoaderService} from "./services/svg-loader.service";
import {WorldData} from "./types/world-data";

@Controller()
export class AppController {
  constructor(private readonly svgLoaderService: SvgLoaderService) {}

  @Get('render')
  async getRender(worldData:WorldData): Promise<string> {
    return this.svgLoaderService.load(worldData);
  }
}
