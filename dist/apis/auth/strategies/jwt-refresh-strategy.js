"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class JwtRefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'refresh') {
    constructor() {
        super({
            jwtFromRequest: (req) => {
                console.log(req);
                const cookie = req.headers.cookie;
                const refreshToken = cookie.replace('refreshToken=', '');
                return refreshToken;
            },
            secretOrKey: '나의리프레시비밀번호',
        });
    }
    validate(payload) {
        console.log(payload);
        return {
            id: payload.sub,
        };
    }
}
exports.JwtRefreshStrategy = JwtRefreshStrategy;
//# sourceMappingURL=jwt-refresh-strategy.js.map