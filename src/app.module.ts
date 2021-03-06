import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {SvgLoaderService} from "./services/svg-loader.service";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    controllers: [
        AppController
    ],
    providers: [
        SvgLoaderService,
    ],
})
export class AppModule {
}
