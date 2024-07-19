// 최종적으로 실행시켜주는 파일은 main.ts 파일 내에 존재하는 app 부분
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    // Pipe는 데이터가 오고가는 흐름에 있어서 데이터 검증과 필터링을 해주는 역할
    // 최솟값 설정 (Min())할 때 사용
    app.useGlobalFilters(new HttpExceptionFilter());
    // commons- filter에서 예외처리 할 때 사용
    await app.listen(3000);
}
bootstrap();
