import React from "react";

const NavigationContext = React.createContext("/");

export default class NavigationProvider extends React.Component<string> {
  constructor(props: string) {
    super(props);
    this.state = {
      pathName: window.location.pathname,
      navigation: this.navigate,
    };
    window.onpopstate = () => {
      this.setState({ pathname: window.location.pathname });
    };
    this.navigate = this.navigate.bind(this);
  }

  navigate(pathname: string): void {
    this.setState({ pathname });
    window.history.pushState(null, "", pathname);
  }

  // render() {
  //   <div>'a'</div>
  //   // return <NavigationContext.Provider value={}></NavigationContext.Provider>;
  // }
}
