import { BrowserRouter, Link} from "react-router-dom";
import singleSpaReact from "single-spa-react";
import React from "react";
import ReactDOM from "react-dom";

import './nav-route.css';

function _NavRoute({names }) {
  const link = window.location.pathname;
  const linkPatitions = link.split("/");

  return (
    <div className="nav-route">
      <BrowserRouter>
        {linkPatitions.reduce((prev, linkPatition, i, a) => {
          if (i !== a.length - 1) {
            prev.push(
                <Link to={a.slice(0, i + 1).join("/")}>{names[i]}</Link>
            );
            prev.push(<p>/</p>)
          }
          else {
            prev.push(
                <p className="current-route">{names[i] || linkPatition}</p>
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