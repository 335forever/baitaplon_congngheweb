import { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faShoppingCart,
  faUser,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

import { tabs } from "./tabs";
import "./navbar.css";

library.add(faHeart, faShoppingCart, faUser, faSearch);

export default function NavBar(props) {
  const [account, setAccount] = useState(false);

  function handleChange(event) {
    console.log(event.target.value);
  }

  return (
    <nav className="relative items-stretch box-border flex flex-col shrink-0 m-0 p-0 z-50">
      <BrowserRouter>
        <div className="h-16"></div>
        <div className="fixed flex flex-col h-16 top-0 items-center w-full border-bottom border-b bg-white px-2.5">
          <div
            id="navbar-container"
            className="items-center box-border flex flex-row h-16 justify-between w-full z-50 m-0 p-0"
            style={{maxWidth: "1180px"}}
          >
            <Link id="logo" className="text-2xl quicksand-bold inline-block" to="/">
              TachMonShop
            </Link>
            <div
              id="tabs"
              className="flex flex-row justify-between max-w-md grow px-1"
            >
              {tabs.map((e) => (
                <Link key={e.name} to={e.to}>
                  {e.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-row gap-6 justify-between items-center">
              <div className="search-box">
                <input type="text" onChange={handleChange} placeholder="Bạn muốn tìm gì?" />
                <button className="m-0 p-0"><FontAwesomeIcon className="w-4 h-4 p-1" icon="fas fa-search"/></button>
              </div>
              <div className="flex flex-row gap-4 justify-between">
                <button>
                  <FontAwesomeIcon icon="fas fa-heart w-5" />
                </button>
                <button>
                  <FontAwesomeIcon icon="fas fa-shopping-cart w-5" />
                </button>
                <button>
                  <FontAwesomeIcon icon="fas fa-user w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </nav>
  );
}
