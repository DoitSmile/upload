import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException) {
        // HttpException type으로 정의한 것
        const status = exception.getStatus();
        const message = exception.message;
        console.log('=======================================');
        console.log('예외 발생');
        console.log('예외 메세지:', message);
        console.log('예외 코드:', status);
        console.log('=======================================');
    }
    // catch: 어떤 에러가 발생했는지 확인해볼 수 있다. HttpExceptionFilter와 catch는 짝꿍임
    // Exception 상황 발생시 비즈니스 로직에 try ~ catch 문이 없더라도 자동으로 에러가 catch 문으로 들어옵니다.
    // try ~ catch 문 을 모든 함수에 작성하게 되면 코드가 점점 길어지므로
    // ExceptionFilter 를 사용하면 try ~ catch 문을 하나하나 작성하지 않아도
    // "모든 에러"는 ExceptionFilter 로 자동으로 들어오게 됩니다.
}
