import { IToken, IClientToken } from "./IToken";
import { getSToken } from "./SToken";
import { getNextHour as getTimePlusOne } from "./Utility";

let _token: IClientToken | null =
  JSON.parse(String(localStorage.getItem("REACT_TOKEN_AUTH"))) || null;

export const createToken = (): IToken => {
  return {
    getToken,
    isLoggedIn,
    setToken,
  };
};

const getExpirationToken = (clientToken: IClientToken): number | null => {
  if (!clientToken || !clientToken?.lastLoginTime) {
    return null;
  } else {
    return getTimePlusOne(clientToken.lastLoginTime);
  }
};

const isTokenExpired = (lastLoginTimePlusOne: number | null): boolean => {
  if (!lastLoginTimePlusOne) {
    return true;
  } else {
    return Date.now() > lastLoginTimePlusOne;
  }
};

const getToken = async (): Promise<string | null> => {
  if (!_token) {
    return null;
  }
  if (isTokenExpired(getExpirationToken(_token))) {
    const isUpdated = await createNewToken(_token);
    if (!isUpdated) {
      return null;
    } else {
      if (_token && _token.sl_token) return _token && _token?.sl_token;
      return null;
    }
  } else {
    if (_token && _token.sl_token) return _token && _token.sl_token;
    return null;
  }
};

const isLoggedIn = (): boolean => {
  return !!_token && !!_token.sl_token;
};

const setToken = async (token?: IClientToken): Promise<boolean> => {
  if (token && token.sl_token) {
    localStorage.setItem("REACT_TOKEN_AUTH", JSON.stringify(token));
    return true;
  } else if (token && token.client_id) {
    return await createNewToken(token);
  } else {
    _token = null;
    localStorage.removeItem("REACT_TOKEN_AUTH");
    return true;
  }
};

const createNewToken = async (token: IClientToken): Promise<boolean> => {
  const newToken = await getSToken(token);
  if (!newToken) {
    return false;
  } else {
    _token = newToken;
    return setToken(newToken);
    // return true;
  }
};
export default createToken;
