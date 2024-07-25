"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login({ email, password, context }) {
        const user = await this.userService.findOneByEmail({ email });
        if (!user)
            throw new common_1.UnprocessableEntityException('이메일이 없습니다.');
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth)
            throw new common_1.UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
        this.setRefreshToken({ user, context });
        return this.getAccessToken({ user });
    }
    setRefreshToken({ user, context }) {
        const refreshToken = this.jwtService.sign({ sub: user.id }, { secret: '나의리프레시비밀번호', expiresIn: '2w' });
        context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    }
    restoreAccessToken({ user }) {
        return this.getAccessToken({ user });
    }
    getAccessToken({ user }) {
        return this.jwtService.sign({ sub: user.id }, { secret: '나의 비밀번호', expiresIn: '10s' });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map