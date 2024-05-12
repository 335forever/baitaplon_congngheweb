import { useRef, useState } from "react";
import Parcel from "single-spa-react/parcel";
import { PopupMenu } from "@TachMonShop/styleguide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clsx } from "clsx";
import { navigateToUrl } from "single-spa";

import { isSignedIn } from "@TachMonShop/api";

import "../navbar.css";

function SignInPopUp() {
    return (<ul id="login-popup">
        <li onClick={() => navigateToUrl('/signin')}>Đăng nhập</li>
        <li onClick={() => navigateToUrl('/signup')}>Đăng ký</li>
    </ul>)
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
        {isSignedIn() ? localStorage.getItem('token') : <SignInPopUp />}
      </Parcel>
    </div>
  );
}
