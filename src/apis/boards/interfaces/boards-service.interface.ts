import { CreateBoardInput } from '../dto/create-board.input';

// 객체 타입을 만들 때에는 interface활용
export interface IBoardServiceCreate {
    createBoardInput: CreateBoardInput;
}
