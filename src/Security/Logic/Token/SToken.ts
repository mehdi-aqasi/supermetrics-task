import { IClientToken } from "./IToken";

export const getSToken = async (
  token: IClientToken
): Promise<IClientToken | null> => {
  try {
    let formData =new FormData();
    if (token.client_id)
      formData.append('client_id',token.client_id);
      
    if (token.email)
      formData.append('email',token.email);

    if (token.name)
      formData.append('name',token.name);

    const response = await fetch(
      `${process.env.REACT_APP_URL}${process.env.REACT_APP_USER_REGISTER}` ,
      {
        method: "POST",
        body: formData
      }
    );
    const result = await response.json();
    
    if (!result || !result.data || !result.data.sl_token) {
      console.log("There is no valid result or sl_token in result");
      return null;
    } else {
      token.sl_token = result.data.sl_token;
      return token;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
