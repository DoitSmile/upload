"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("@google-cloud/storage");
let FilesService = class FilesService {
    upload({ file }) {
        console.log(file);
        const storage = new storage_1.Storage({
            projectId: 'backend-431212',
            keyFilename: 'gcp-file-storage.json',
        }).bucket('backendyeon-storage');
        file.createReadStream()
            .pipe(storage.file(file.filename).createWriteStream())
            .on('finish', () => {
            console.log('성공');
        })
            .on('error', () => console.log('실패'));
        console.log('파일전송이 완료되었습니다.');
        return '임시작성';
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
//# sourceMappingURL=files.service.js.map