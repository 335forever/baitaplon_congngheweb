import { useState, useLayoutEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faShoppingCart,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import "./navbar.css";
import Tabbar from "./components/tabbar.component";
import SearchBox from "./components/searchbox.component";
import AccountButton from "./components/account-button.component";


library.add(faHeart, faShoppingCart, faUser, faSearch);

export default function NavBar() {
  const [activePath, setActivePath] = useState(() => location.pathname);
  
  useLayoutEffect(() => {
    const handlePathChange = () => {
      setActivePath(location.pathname);
    };

    window.addEventListener("popstate", handlePathChange);

    return () => {
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  return (
    <div>
      <nav className="relative items-stretch box-border flex flex-col shrink-0 m-0 p-0 z-50 h-16">
        <BrowserRouter>
          <div className="h-16"></div>
          <div className="fixed flex flex-col h-16 top-0 items-center w-full border-bottom border-b bg-white px-2.5">
            <div
              id="navbar-container"
              className="items-center box-border flex flex-row h-16 justify-between w-full z-50 m-0 p-0"
              style={{ maxWidth: "1180px" }}
            >
              <Link
                id="logo"
                className="text-2xl quicksand-bold inline-block"
                to="/"
              >
                TamoShop
              </Link>
              <Tabbar activePath={activePath} />
              <div className="action-bar flex flex-row gap-6 justify-between items-center h-full">
                <SearchBox />
                <div className="flex flex-row justify-between h-full">
                  <Link className="h-full w-8 flex justify-center items-center" to='/wishlist'>
                    <FontAwesomeIcon icon="fas fa-heart w-5" />
                  </Link>
                  <Link className="h-full w-8 flex justify-center items-center" to='/cart'>
                    <FontAwesomeIcon icon="fas fa-shopping-cart w-5" />
                  </Link>
                  <AccountButton />
                </div>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </nav>
    </div>
  );
}
