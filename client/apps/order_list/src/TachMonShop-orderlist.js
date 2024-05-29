import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Wishlist from "./wishlist.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Wishlist,
  errorBoundary(err, info, props) {
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
