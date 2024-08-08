import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
    // PassportStrategy(인가처리방식,인증방식이름(개인설정)) 인증방식이름은 resolver의 AuthGuard()내에 적은 이름과 동일해야 한다.
    constructor() {
        super({
            //super를 사용하여 부모클래스 (PassportStrategy)의 생성자 함수 constructor()를 호출하여 jwt옵션값을 넘겨준다.
            // 부모클래스의 생성자 함수 내에는 유효한 토큰인지, 토큰 만료시간이 남았는지 등을 파악하는 토큰 검증 로직이 들어있습니다. super() 내에 토큰 검증 로직을 만들게 되면, 부모클래스에서 해당 검증 로직을 실행시켜 줍니다.
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // jwtFromRequest: 프론트로부터 받은 요청 내(Header)에 존재하는 jwt token을(fromAuthHeaderAsBearerToken()) 추출해 줍니다(ExtractJwt).
            secretOrKey: '나의 비밀번호', // 이전에 토큰을 발행했던 secretKey와 동일하게 작성해야 복호화 할 때 토큰의 payload 정보를 뽑아올 수 있습니다.
        });
    }

    validate(payload) {
        // validate: 검증에 성공하면  payload를 열어 사용자의 정보 반환
        console.log(payload);
        return {
            id: payload.sub,
        };
        // return: fetchUser API로 return 되는 것이 아님
        // context 안의 req에 user라는 이름으로 email과 id 정보가 담긴 객체를 user 안으로 return되는 것입니다 (passport에서 user를 자동으로 만들어 주기에, 바꿀 수 없습니다).
        // context는 요청 정보이기에 API 중간중간 어디서든 뽑아서 사용할 수 있습니다.
    }
}
