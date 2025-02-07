"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("../users/user.module");
const auth_resolver_1 = require("./auth.resolver");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_access_strategy_1 = require("./strategies/jwt-access.strategy");
const jwt_refresh_strategy_1 = require("./strategies/jwt-refresh-strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), user_module_1.UsersModule],
        providers: [
            auth_resolver_1.AuthResolver,
            auth_service_1.AuthService,
            jwt_access_strategy_1.JwtAccessStrategy,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map