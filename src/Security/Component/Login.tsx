import React, { ChangeEvent, FormEvent } from "react";
import { IClientToken } from "../Logic/Token/IToken";
import { createAuthentication } from "../Logic/Auth/Auth";
import logo from "../../assets/logo.svg";
import "./Login.css";
//----------
// import { customAlphabet } from "nanoid";
// import { lowercase,numbers } from "nanoid-dictionary";

interface ILoginProps {
  loginChanged(status: boolean): void;
}
interface ILoginState extends IClientToken {
  isLoggedin: boolean;
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);
    // const nanoid = customAlphabet(lowercase+numbers, 25)
    this.state = {
      client_id: "ju16a6m81mhid5ue1z3v2g0uh",
      isLoggedin: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async onSubmit(event: FormEvent) {
    if (event) event.preventDefault();
    const result = await createAuthentication().login(this.state);
    this.setState({ ...this.state, isLoggedin: result });
    this.props.loginChanged(result);
  }

  onChange({ target: { name, value } }: ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, [name]: value });
  }

  render() {
    return (
      <>
        <div className="body-login">
          <form onSubmit={this.onSubmit} className="form-login">
            <img src={logo} alt="supermetrics logo" className="logo-login" />
            <input
              className="input-login email"
              name="email"
              value={this.state.email || ""}
              onChange={this.onChange}
            ></input>
            <input
              className="input-login name"
              name="name"
              value={this.state.name || ""}
              onChange={this.onChange}
            ></input>
            <input type="submit" value="Login" className="button-login" />
          </form>
        </div>
      </>
    );
  }
}

export default Login;
