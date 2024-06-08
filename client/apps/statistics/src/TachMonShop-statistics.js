import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Statistics from "./statistics.component.js";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Statistics,
  errorBoundary(err, info, props) {
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
