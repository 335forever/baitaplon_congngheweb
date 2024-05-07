import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import NavBar from "./navbar.component";

const lifecycles = singleSpaReact({
  renderType: "createRoot",
  React,
  ReactDOM,
  rootComponent: NavBar,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
