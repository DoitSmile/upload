import { Board } from './entities/board.entities';
import { IBoardServiceCreate } from './interfaces/boards-service.interface';
export declare class BoardsService {
    findAll(): Board[];
    create({ createBoardInput }: IBoardServiceCreate): string;
}
