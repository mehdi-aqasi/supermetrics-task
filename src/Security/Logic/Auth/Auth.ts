import { IClientToken } from "../Token/IToken";
import createToken from "../Token/Token";
import { IAuth } from "./IAuth";

const token = createToken();

export const createAuthentication = (): IAuth => {
  return {
    isAuthenticated,
    authUser,
    login,
    logout,
  };
};

const isAuthenticated = () => {
  return token.isLoggedIn()
};

const authUser = async() => {
  if (token.isLoggedIn()) {
    return await token.getToken();
  } else {
    return null;
  }
};

const login = async (newToken: IClientToken): Promise<boolean> => {
  return await token.setToken(newToken);
};

const logout = async (): Promise<boolean> => {
  return await token.setToken();
};
