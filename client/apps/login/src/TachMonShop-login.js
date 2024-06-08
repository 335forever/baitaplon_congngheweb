import React from "react";
import ReactDOM from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  renderType: "createRoot",
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  loadRootComponent: import("./root.component.js").then(mod => mod.default)
});

export const { bootstrap, mount, unmount } = lifecycles;
