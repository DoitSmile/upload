export interface IUserCreate {
    email: string;
    password: string;
    name: string;
    age: number;
}
export interface IUserServiceFindOneByEmail {
    email: string;
}
