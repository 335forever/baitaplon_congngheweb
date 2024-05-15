import "./index.css";
import React from "react";
import brand from "../assets/images/brand.svg";
import { Provider, useDispatch, useSelector } from "react-redux"
import { navigateToUrl } from "single-spa";
import { Button, ChakraProvider, useToast, CircularProgress } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { signUp } from "@TachMonShop/api";
import { signUpFormStore } from "./controllers/signup/signup.store";
import { signUpFormActions } from "./controllers/signup/signup.slice";

function RegisterContent(props) {
  const [isLogging, setIsLogging] = React.useState(false)
  const toast = useToast();
  const dispatch = useDispatch();
  const form = useSelector((state) => state.signUpForm)

  const sign = async () => {
    if (validate()) {
      setIsLogging(true);
      await signUp(
        form,
        (res) => {
          //localStorage.setItem("token", res.data.token);
          navigateToUrl("/");
          toast({
            title: "Đăng ký thành công!",
            duration: 5000,
            isClosable: false,
            status: "success",
          });
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
      setIsLogging(false);
    }
  };

  const validate = () => {
    dispatch(signUpFormActions.validate())
    return form.isValid;
  };

  return (
    <ChakraProvider>
      <div id="wrapper">
        <img src={brand} id="brand" />

        <div id="account">
          <div id="sign">
            <div id="title">{"Đăng ký"}</div>
            <p>{"Điền các thông tin của bạn"}</p>
            <div>
              <input
                className="login-input"
                type="text"
                placeholder="Tên đăng nhập"
                style={{ width: "100%" }}
                onChange={(e) => dispatch(signUpFormActions.setUsername(e.target.value))}
              />
              <p style={{ color: "red", fontSize: "12px" }}>{form.nameError}</p>
            </div>
            <div>
              <input
                className="login-input"
                type="password"
                placeholder="Mật khẩu"
                style={{ width: "100%" }}
                onChange={(e) => dispatch(signUpFormActions.setPassword(e.target.value))}
              />
              <p style={{ color: "red", fontSize: "12px" }}>{form.passwordError}</p>
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="login-input"
                type="password"
                placeholder="Xác nhận mật khẩu"
                style={{ width: "100%" }}
                onChange={(e) => dispatch(signUpFormActions.setRetypePassword(e.target.value))}
              />
            </div>
            <p style={{ color: "red", fontSize: "12px" }}>
              {form.retypeError}
            </p>
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
              }}
            >
              <input
                className="login-input"
                type="text"
                placeholder="Họ tên"
                style={{ width: "100%" }}
                onChange={(e) => dispatch(signUpFormActions.setName(e.target.value))}
              />
            </div>
            <div style={{ display: "flex" }}>
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
                onChange={(e) => dispatch(signUpFormActions.setDob(e.target.value))}
              />
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="login-input"
                type="text"
                placeholder="Số điện thoại"
                style={{ width: "100%" }}
                onChange={(e) => dispatch(signUpFormActions.setPhoneNumber(e.target.value))}
              />
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="login-input"
                type="text"
                placeholder="Địa chỉ"
                style={{ width: "100%" }}
                onChange={(e) => dispatch(signUpFormActions.setAddress(e.target.value))}
              />
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="login-input"
                type="text"
                placeholder="Email"
                style={{ width: "100%" }}
                onChange={(e) => dispatch(signUpFormActions.setEmail(e.target.value))}
                onKeyDown={(e) => (e.key === "Enter" ? sign() : null)}
              />
            </div>
          </div>
          <div className="option" id="signUpSuggest">
            <label>Bạn đã có tài khoản?</label>
            <Link color="red" to="/signin">
              {"Đăng nhập"}
            </Link>
          </div>
          <div className="option" display={"flex"}>
            <Button
              colorScheme="red"
              color="white"
              fontFamily="Quicksand"
              fontWeight="500"
              onClick={sign}
              padding="2rem 2.5rem"
              variant="solid"
            >
              {isLogging ? <CircularProgress isIndeterminate color="white"/> : "Đăng ký"}
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
  );
}

export function Register(props) {
  return (<Provider store={signUpFormStore}>
    <RegisterContent />
  </Provider>)
}