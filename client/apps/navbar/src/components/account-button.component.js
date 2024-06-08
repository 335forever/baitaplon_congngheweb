import { useRef, useState, createElement } from "react";
import Parcel from "single-spa-react/parcel";
import { PopupMenu } from "@TachMonShop/styleguide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clsx } from "clsx";
import { navigateToUrl } from "single-spa";
import { isSignedIn, logout } from "@TachMonShop/api";

import "../navbar.css";

function SignInPopUp({ onClickOnPopup }) {
  function goTo(url) {
    navigateToUrl(url);
    onClickOnPopup(false);
  }

  return (
    <ul id="login-popup">
      <li onClick={() => goTo("/signin")}>Đăng nhập</li>
      <li onClick={() => goTo("/signup")}>Đăng ký</li>
    </ul>
  );
}

function AccountPopup({ onClickOnPopup }) {
  function funcPopout(callback, ...args) {
    return (...args) => {
      callback(...args);
      onClickOnPopup(false);
    };
  }

  function handleLogout() {
    logout();
    location.reload();
  }

  function navigateToAccount() {
    navigateToUrl('/account');
  }

  return (
    <ul id="login-popup">
      <li
        onClick={funcPopout(navigateToAccount)}
      >
        Tài khoản
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

export default function AccountButton() {
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const accountButton = useRef();

  return (
    <div className="relative">
      <button
        ref={accountButton}
        className={clsx("h-full w-8", isOpenAccount && "button-show-popup")}
        onClick={() => setIsOpenAccount((state) => !state)}
      >
        <FontAwesomeIcon icon="fas fa-user w-5 h-8" />
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
        {createElement(
          isSignedIn() ? AccountPopup : SignInPopUp,
          {onClickOnPopup : setIsOpenAccount}
        )}
      </Parcel>
    </div>
  );
}
