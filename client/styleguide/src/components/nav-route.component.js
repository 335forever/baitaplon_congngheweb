import { BrowserRouter, Link} from "react-router-dom";
import singleSpaReact from "single-spa-react";
import React from "react";
import ReactDOM from "react-dom";

import './nav-route.css';

function _NavRoute({names }) {
  const link = window.location.pathname;
  console.log(link);
  const linkPatitions = link.split("/");
  console.log(linkPatitions);
  if (linkPatitions.length !== names.length) { 
    throw Error("Link and names must be the same length!");
  }
  return (
    <div className="nav-route">
      <BrowserRouter>
        {names.reduce((prev, name, i) => {
          if (i !== linkPatitions.length - 1) {
            prev.push(
                <Link to={linkPatitions.slice(0, i + 1).join("/")}>{name}</Link>
            );
            prev.push(<p>/</p>)
          }
          else {
            prev.push(
                <p className="current-route">{name}</p>
            );
          }
          return prev;
        }, [])}
      </BrowserRouter>
    </div>
  );
}

export const NavRoute = singleSpaReact({
  renderType: "createRoot",
  React,
  ReactDOM,
  rootComponent: _NavRoute,
});