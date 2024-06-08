import './index.css'

import icCall from "../assets/images/ic_call.svg";
import icWrite from "../assets/images/ic_write.svg";

import React, { useState } from "react";

import { ChakraProvider, Button, CircularProgress, useToast } from "@chakra-ui/react";

export default function Contact(props) {
  const [form, setForm] = React.useState({
    fullname: null,
    phoneNumber: null,
    email: null,
    question: null
  })

  const [isSending, setIsSending] = React.useState(false);

  const toast = useToast();

  const validate = () => {
    if (form.fullname == null) {
      toast({
        title: "Lỗi",
        description: "Bạn chưa nhập họ tên",
        status: "error",
        duration: 3000,
        isClosable: true,
      })

      return false;
    } else if (form.phoneNumber == null) {
      toast({
        title: "Lỗi",
        description: "Bạn chưa nhập số điện thoại",
        status: "error",
        duration: 3000,
        isClosable: true,
      })

      return false;
    } else if (form.email == null) {
      toast({
        title: "Lỗi",
        description: "Bạn chưa nhập email",
        status: "error",
        duration: 3000,
        isClosable: true,
      })

      return false;
    }

    if (!/^0\d{9}$/.test(form.phoneNumber)) {
      toast({
        title: "Số điện thoại không hợp lệ",
        description: "Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({
        title: "Email không hợp lệ",
        description: "Email phải có định dạng abc@def.xyz",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
  }

  const send = () => {
    if (validate()) {
      setIsSending(true);
    }
  }

  return (
    <ChakraProvider>
      <div id="wrapper">
        {/* Em import cái TachMonShop/styleguide toàn bị lỗi thôi */}
        <div id="route">
          <div style={{ "color": "#7D8184" }}>Home </div>
          <div>/</div>
          <div>Contact</div>
        </div>
        <div id="main-body">
          <div id="info">
            <div id="call" className="info-item">
              <div className="icon">
                <img src={icCall} alt="" />
                <div>Call To Us</div>
              </div>
              <div>Chúng tôi luôn có mặt 24/7</div>
              <div>Số điện thoại: +84321112222</div>
            </div>
            <div id="write" className="info-item">
              <div className="icon">
                <img src={icWrite} alt="" />
                <div>Write To Us</div>
              </div>
              <div>Điền vào biểu mẫu này và chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.</div>
              <div>Email: customer@tachmonshop.com</div>
              <div>Email: support@tachmonshop.com</div>
            </div>
          </div>
          <div id="content">
            <div style={{ "display": "flex", "gap": "16px" }}>
              <input onChange={(e) => setForm({ ...form, fullname: e.target.value })} placeholder="Họ tên *"></input>
              <input type="number" onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} placeholder="Số điện thoại *"></input>
              <input onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email *"></input>
            </div>
            <div style={{ "flexGrow": "1" }}>
              <textarea onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Câu hỏi"></textarea>
            </div>
            <div id="button" onClick={send}>
              <Button colorScheme="red" minWidth="27.8%" disabled={!isSending}>
                {isSending ? <CircularProgress isIndeterminate color="white" /> : "Gửi tin nhắn"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider >
  )
}
