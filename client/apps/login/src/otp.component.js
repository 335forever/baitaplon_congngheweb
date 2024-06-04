import React, { useState } from "react";
import { ChakraProvider, Button, theme } from "@chakra-ui/react";

import brand from "../assets/images/brand.svg";
import './index.css';

export function OTP() {
    const [otp, setOTP] = React.useState(0);
    const [isVerifying, setIsVerifying] = React.useState(false);

    const verify = async () => {
        setIsVerifying(true);
        // Hanlding
    }

    return (<ChakraProvider theme={theme}>
        <div id="wrapper">
            <img src={brand} alt="" id="brand" />
            <div id="account">
                <div id="otp">
                    <div id="title">Mã xác thực</div>
                    <p>Nhập mã xác thực vừa được gửi về email của bạn</p>
                    <div>
                        <input
                            className="login-input"
                            type="number"
                            placeholder="Mã OTP"
                            style={{ width: "100%" }}
                            onChange={(e) => setOTP(e.target.value)}
                            onKeyDown={(e) => (e.key === "Enter" ? sign() : null)}
                        />
                    </div>
                </div>
                <div className="option" display={"none"}>
                    <Button
                        colorScheme="red"
                        color="white"
                        fontFamily="Quicksand"
                        fontWeight="500"
                        onClick={verify}
                        padding="2rem 2.5rem"
                        variant="solid"
                        disabled={isVerifying}
                    >
                        {isVerifying ? <CircularProgress isIndeterminate color="white" /> : "Xác nhận"}
                    </Button>
                </div>
            </div>
        </div>
    </ChakraProvider>)
}