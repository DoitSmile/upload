import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
    constructor(private readonly filesService: FilesService) {}

    @Mutation(() => String)
    uploadFile(
        @Args({ name: 'file', type: () => GraphQLUpload }) // 받을 때는 grapql 타입사용
        file: FileUpload, // 보낼 때는 typescript타입 사용
    ): string {
        return this.filesService.upload({ file });
    }
}
