import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import ManageProduct from "./manage-products.component.js";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: ManageProduct,
  errorBoundary(err, info, props) {
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
