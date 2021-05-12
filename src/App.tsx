import React from "react";

import "./App.css";
import Container from "./Post/Component/Container";
import Login from "./Security/Component/Login";
// import createToken from "./Security/Logic/Token/Token";
import { createAuthentication } from "./Security/Logic/Auth/Auth";

interface IAppProps {}
interface IAppState {
  isLogin:boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = { isLogin: createAuthentication().isAuthenticated() };
  }

  loginChanged(value:boolean):void {
    this.setState({ isLogin: value });
    console.log("called");
  }

  render() {
    return (
      <div className="App">
        {!this.state.isLogin && <Login loginChanged={(value)=>this.loginChanged(value)}/>}
        {this.state.isLogin && <Container />}
      </div>
    );
  }
}

export default App;
