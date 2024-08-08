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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsTransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pointTransaction_entity_1 = require("./entities/pointTransaction.entity");
const users_entity_1 = require("../users/entities/users.entity");
let PointsTransactionsService = class PointsTransactionsService {
    constructor(pointsTransactionsRepository, usersRepository, dataSource) {
        this.pointsTransactionsRepository = pointsTransactionsRepository;
        this.usersRepository = usersRepository;
        this.dataSource = dataSource;
    }
    async create({ impUid, amount, user: _user, }) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');
        try {
            const pointTransaction = this.pointsTransactionsRepository.create({
                impUid,
                amount,
                user: _user,
                status: pointTransaction_entity_1.POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
            });
            await queryRunner.manager.save(pointTransaction);
            const user = await queryRunner.manager.findOne(users_entity_1.User, {
                where: { id: _user.id },
                lock: { mode: 'pessimistic_write' },
            });
            const updatedUser = this.usersRepository.create({
                ...user,
                point: user.point + amount,
            });
            await queryRunner.manager.save(updatedUser);
            await queryRunner.commitTransaction();
            return pointTransaction;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.PointsTransactionsService = PointsTransactionsService;
exports.PointsTransactionsService = PointsTransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pointTransaction_entity_1.PointTransaction)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PointsTransactionsService);
//# sourceMappingURL=pointTransactions.service2.js.map