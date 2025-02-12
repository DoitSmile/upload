// files.service.ts

import { Injectable } from '@nestjs/common';

import { Storage } from '@google-cloud/storage';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
    upload({ file }: IFilesServiceUpload): string {
        console.log(file);

        // 1. 파일을 클라우드 스토리지에 저장하는 로직

        // 1-1) 스토리지 셋팅하기
        const storage = new Storage({
            projectId: 'backend-431212',
            keyFilename: 'gcp-file-storage.json',
        }).bucket('backendyeon-storage');

        // 1-2) 스토리지에 파일 올리기
        file.createReadStream() // 해당 파일 읽고
            .pipe(storage.file(file.filename).createWriteStream()) // 스토리지에 올려줌
            .on('finish', () => {
                console.log('성공');
            })
            .on('error', () => console.log('실패'));

        console.log('파일전송이 완료되었습니다.');

        return '임시작성';
    }
}
