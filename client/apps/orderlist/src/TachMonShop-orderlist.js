import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Orderlist from "./orderlist.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Orderlist,
  errorBoundary(err, info, props) {
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
