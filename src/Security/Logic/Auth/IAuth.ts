import { IToken,IClientToken } from '../Token/IToken';

export interface IAuth{
    isAuthenticated():boolean;
    authUser():Promise<string|null> | null;
    login(newToken:IClientToken):Promise<boolean>;
    logout():Promise<boolean>;
}