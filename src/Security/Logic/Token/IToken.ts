
export interface IToken {
  getToken(): Promise<string | null>;
  isLoggedIn(): boolean;
  setToken(token?:IClientToken): Promise<boolean>;
}

export interface IClientToken {
    // token:string;
    sl_token?: string; 
    client_id?: string,
    name?:string,
    email?:string
    lastLoginTime?:number;
}