// boards.resolver.ts

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entities';
import { CreateBoardInput } from './dto/create-board.input';

@Resolver()
export class BoardsResolver {
    constructor(
        private readonly boardsService: BoardsService, //
    ) {}

    @Query(() => [Board], { nullable: true }) // - GraphQL에서 API Docs 를 만들기 위한 type으로 대문자로 시작됩니다.
    fetchBoards(): Board[] {
        return this.boardsService.findAll();
    }

    @Mutation(() => String)
    createBoard(
        // @Args('writer') writer: string,
        // @Args('title') title: string,
        // @Args({ name: 'contents', nullable: true }) contents: string,
        @Args('createBoardInput') createBoardInput: CreateBoardInput,
    ): string {
        return this.boardsService.create({ createBoardInput });
    }
}
