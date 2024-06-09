import React, { useRef } from "react";
import brand from "../assets/images/brand.svg";
import { Button, ChakraProvider, CircularProgress } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { signIn } from "@TachMonShop/api";
import { navigateToUrl } from "single-spa";
import { theme } from "./root.component";
import { toast } from "@TachMonShop/notification";

import "./index.css";

export function Login(props) {
  document.title = "TachMonShop | Đăng nhập"
  const [form, setForm] = React.useState({
    action: "signin",
    username: null,
    password: null,
  });
  const [isLogging, setIsLogging] = React.useState(false)

  const urlParams = new URLSearchParams(window.location.search);

  // const toast = useToast();
  const usernameInput = useRef();
  const passwordInput = useRef();

  const sign = async () => {
    if (validate()) {
      setIsLogging(true);
      await signIn(
        form,
        (res) => {
          localStorage.setItem("token", res.data.token);
          toast({
            title: "Đăng nhập thành công!",
            duration: 1000,
            isClosable: false,
            status: "success",
          });
          navigateToUrl(urlParams.get("r") || '/');
        },
        (res) => {
          toast({
            title: "Lỗi",
            description: "Tài khoản hoặc mật khẩu không đúng",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      );
      setIsLogging(false);
    }
  };

  const validate = () => {
    if (!form.username) {
      toast({
        title: "Lỗi",
        description: "Bạn chưa nhập username",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      usernameInput.current.focus()
      return false;
    } else if (!form.password) {
      toast({
        title: "Lỗi",
        description: "Bạn chưa nhập mật khẩu",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      passwordInput.current.focus();
      return false;
    }

    return true;
  };

  return (
    <ChakraProvider theme={theme}>
      <div id="wrapper">
        <img src={brand} id="brand" />
        <div id="account">
          <div id="sign">
            <div id="title">{"Đăng nhập"}</div>
            <p>{"Nhập tài khoản và mật khẩu"}</p>
            <div>
              <input
                ref={usernameInput}
                className="login-input"
                type="text"
                placeholder="Tên đăng nhập"
                style={{ width: "100%" }}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                onKeyDown={(e) => (e.key === "Enter" ? sign() : null)}
              />
            </div>
            <div>
              <input
                ref={passwordInput}
                className="login-input"
                type="password"
                placeholder="Mật khẩu"
                style={{ width: "100%" }}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={(e) => (e.key === "Enter" ? sign() : null)}
              />
            </div>
            <div style={{ display: "none" }}>
              <input
                className="login-input"
                type="password"
                placeholder="Xác nhận mật khẩu"
                style={{ width: "100%" }}
                onChange={(e) => setConfirm(e.target.value == form.password)}
              />
            </div>
            <p style={{ color: "red", fontFamily: "Roboto", fontSize: "12px" }}>
              {confirm ? "" : "Không khớp"}
            </p>
            <div style={{ display: "none", marginBottom: "10px" }}>
              <input
                className="login-input"
                type="text"
                placeholder="Họ tên"
                style={{ width: "100%" }}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div style={{ display: "none" }}>
              <input
                className="login-input"
                type="text"
                placeholder="Ngày sinh"
                style={{ width: "100%" }}
                onFocus={(e) => {
                  e.target.type = "date";
                  e.target.placeholder = "";
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    e.target.type = "text";
                    e.target.placeholder = "Ngày sinh";
                  }
                }}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
              />
            </div>
          </div>
          <div className="option" id="signUpSuggest">
            <label>Bạn chưa có tài khoản?</label>
            <Link color="red" to="/signup">
              <div style={{ color: "#db4444", fontWeight: "700" }}>Đăng ký</div>
            </Link>
          </div>
          <div className="option" display={"none"}>
            <Button
              colorScheme="red"
              color="white"
              fontFamily="Quicksand"
              fontWeight="500"
              onClick={sign}
              padding="2rem 2.5rem"
              variant="solid"
              disabled={isLogging}
            >
              {isLogging ? <CircularProgress isIndeterminate color="white" /> : "Đăng nhập"}
            </Button>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                width: "50%",
              }}
            >
              <Link color="red">Quên mật khẩu?</Link>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  )
}
