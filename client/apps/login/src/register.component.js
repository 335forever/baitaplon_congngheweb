import "./index.css";
import React from "react";
import axios from "axios";
import brand from "../assets/images/brand.svg";
import { Button, ChakraProvider, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { signUp, isSignedIn, logout } from "@TachMonShop/api";

export function Register(props) {
  const [confirm, setConfirm] = React.useState(true);
  const [isSeller, setSeller] = React.useState(false);
  const [form, setForm] = React.useState({
    username: null,
    password: null,
    name: null,
    email: null,
    dob: null,
    isShoper: false,
    phone: null,
    address: null,
    taxid: null,
  });
  const [message, setMessage] = React.useState();
  const toast = useToast();

  const sign = async () => {
    if (validate()) {
      setMessage(null);
      await signUp(
        form,
        (res) => {
          localStorage.setItem("token", res.data.token);
          toast({
            title: "Đăng ký thành công!",
            duration: 1000,
            isClosable: false,
            status: "success",
          });
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
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
      return false;
    } else if (!form.password) {
      toast({
        title: "Lỗi",
        description: "Bạn chưa nhập mật khẩu",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (!form.name) {
      toast({
        title: "Lỗi",
        description: "Bạn chưa nhập họ tên",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    } else if (!form.dob) {
      toast({
        title: "Lỗi",
        description: "Bạn chưa nhập ngày sinh",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    } else if (!form.phone) {
      toast({
        title: "Lỗi",
        description: "Bạn chưa nhập số điện thoại",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    } else if (!form.address) {
      toast({
        title: "Lỗi",
        description: "Bạn chưa nhập địa chỉ",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
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
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                onKeyDown={(e) => (e.key === "Enter" ? sign() : null)}
              />
            </div>
            <div>
              <input
                className="login-input"
                type="password"
                placeholder="Mật khẩu"
                style={{ width: "100%" }}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={(e) => (e.key === "Enter" ? sign() : null)}
              />
            </div>
            <div style={{ display: "flex" }}>
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
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
              />
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="login-input"
                type="text"
                placeholder="Số điện thoại"
                style={{ width: "100%" }}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="login-input"
                type="text"
                placeholder="Địa chỉ"
                style={{ width: "100%" }}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="login-input"
                type="text"
                placeholder="Email"
                style={{ width: "100%" }}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div style={{ display: "flex", paddingTop: 10 }}>
              <label>Là người bán?</label>
              <input
                type="checkbox"
                onChange={(e) => {
                  setForm({ ...form, isShoper: e.target.checked });
                  setSeller(e.target.checked);
                }}
                style={{ marginLeft: 16 }}
              />
            </div>

            <div style={{ display: !isSeller ? "none" : "flex" }}>
              <input
                className="login-input"
                type="text"
                placeholder="Mã số thuế"
                style={{ width: "100%" }}
                onChange={(e) => setForm({ ...form, taxid: e.target.value })}
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
              {"Đăng ký"}
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
