import React, { useRef, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import "./popup-menu.css";
import { clsx } from "clsx";

function _PopupMenu({ children, isOpen, trigger, setOpenState, equalWidth = false, listenChangeOf = null}) {
  const triggerBound = trigger.current.getBoundingClientRect();

  const [position, setPosition] = useState({
    bottom: "0px",
    left: "0px",
  });
  const popupMenu = useRef();

  useLayoutEffect(() => {
    const handleWindow = () => {
      console.log(window.innerWidth);
      if (isOpen) {
        var popupRect = popupMenu.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        if (triggerBound.left + (triggerBound.width + popupRect.width) / 2 - 10 >= windowWidth) {
          setPosition({
            bottom: - popupRect.height+ "px",
            right: - triggerBound.width + "px",
          });
        } else {
          setPosition({
            bottom: - popupRect.height + "px",
            left: (triggerBound.width - popupRect.width) / 2 + "px",
          });
        }
      }
    };
    handleWindow();
    const handleClickOutside = (event) => {
      if (isOpen) {
        if (
          !popupMenu.current.contains(event.target) &&
          !trigger.current.contains(event.target)
        ) {
          setOpenState(false);
        }
      }
    };

    //window.addEventListener("resize", handleWindow, true);
    document.addEventListener("click", handleClickOutside);
    return () => {
      //window.removeEventListener("resize", handleWindow);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, listenChangeOf]);

  return (
    <div
      ref={popupMenu}
      className={clsx("popup-menu", !isOpen && "hidden")}
      style={{
        ...position,
        width: equalWidth && triggerBound.width + "px"
      }}
    >
      {children}
    </div>
  );
}

export const PopupMenu = singleSpaReact({
  renderType: "createRoot",
  React,
  ReactDOM,
  rootComponent: _PopupMenu,
});
