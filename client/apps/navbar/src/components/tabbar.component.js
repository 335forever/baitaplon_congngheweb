import { accountTabs, tabs } from "../tabs";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { clsx } from "clsx";
import { isSignedIn } from "@TachMonShop/api";

import { useRef, useState, createElement } from "react";
import Parcel from "single-spa-react/parcel";
import { navigateToUrl } from "single-spa";
import { PopupMenu } from "@TachMonShop/styleguide";


function AccountPopup({ onClickOnPopup }) {
  function funcPopout(callback, ...args) {
    return (...args) => {
      callback(...args);
      onClickOnPopup(false);
    };
  }

  function navigateToStat() {
    navigateToUrl('/statistics');
  }

  function navigateToProduct() {
    navigateToUrl('/manage-products');
  }

  

  return (
    <ul id="login-popup">
      <li
        onClick={funcPopout(navigateToStat)}
      >
        Thống kê
      </li>
      <li
        onClick={funcPopout(handleLogout)}
        style={{ color: "var(--color-danger)" }}
      >
        Đăng xuất
      </li>
    </ul>
  );
}

export default function Tabbar(props) {
  const {activePath} = props;
  const isLargeEnough = useMediaQuery({query: "(max-width:868px)"});
  return (
    <div id="tabs" className={clsx("flex flex-row justify-between max-w-md grow px-1", isLargeEnough && "hidden")}>
      {(!isSignedIn() ? tabs : accountTabs).map((e) => (
        <Link
          key={e.name}
          to={e.to}
          className={clsx(activePath == e.to && "navbar-current-route")}
        >
          {e.name}
        </Link>
      ))}
      <>
        {
          !localStorage.getItem("isShoper")? null : <div className="relative">
          <button
            ref={accountButton}
            className={clsx("h-full w-8", isOpenAccount && "button-show-popup")}
            onClick={() => setIsOpenAccount((state) => !state)}
          >
            <div className="flex">
              <p>Cửa hàng</p>
            </div>
          </button>
          <Parcel
            wrapClassName="relative h-0 w-0"
            config={PopupMenu}
            isOpen={isOpenAccount}
            trigger={accountButton}
            setOpenState={setIsOpenAccount}
          >
            {/* {isSignedIn() ? (
              localStorage.getItem("token")
            ) : (
              <SignInPopUp onClickOnPopup={setIsOpenAccount} />
            )} */}
            <AccountPopup />
          </Parcel>
        </div>
        }
      </>
    </div>
  );
}
