import { accountTabs, tabs } from "../tabs";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { clsx } from "clsx";
import { isSignedIn } from "@TachMonShop/api";
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
    </div>
  );
}
