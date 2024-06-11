import icCancelled from "../../assets/images/ic_cancelled.svg"
import icDelivered from "../../assets/images/ic_delivered.svg"
import icProcessing from "../../assets/images/ic_processing.svg"
import icShop from "../../assets/images/ic_shop.svg"
import icUser from "../../assets/images/ic_user.svg";

import { Button, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"

import { findShop, findUser } from "../../../../api/src/controllers/account.controller"
import { findProduct } from "../../../../api/src/controllers/category.controller"

export default function Order({ orderID, status, quantity, orderDate, total, productID, shoperID, msgToShop, msgToUser, seller, onCancel, onConfirm }) {
    const statusLabel = (status) => {
        switch (status) {
            case 1:
                return (
                    <div className="status" >
                        <div className="status-inner" style={{ backgroundColor: '#FFE5EC', color: '#FF316A' }}>
                            <img src={icCancelled} alt="err" />
                            Đã hủy
                        </div >
                    </div >
                )
            case 0:
                return (
                    <div className="status" >
                        <div className="status-inner" style={{ backgroundColor: '#FFF2DA', color: '#FFAA04' }}>
                            <img src={icProcessing} alt="err" />
                            Đang xử lý
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="status" >
                        <div className="status-inner" style={{ backgroundColor: '#CAFBEC', color: '#0DA678' }}>
                            <img src={icDelivered} alt="err" />
                            Đã giao
                        </div>
                    </div>
                )
            default:
                break;
        }
    }

    const [shop, setShop] = React.useState()
    const [product, setProduct] = React.useState();
    const [message, setMessage] = React.useState('');

    async function getShop() {
        await findShop({ shopId: shoperID }, (res) => setShop(res), (res) => { });
    }
    async function getProduct() {
        const res = await findProduct({ productId: productID });
        if (res) setProduct(res)
    }

    useEffect(() => {
        getShop();
        getProduct();
    }, [])

    console.log(shop)

    return (
        <div className="order">
            <div className="title">
                <div className="lefttitle" style={{ display: 'flex', width: '50%' }}>
                    <img src={seller ? icUser : icShop} />
                    <div className="shopName">{shop ? shop[0].name : ''}</div>
                </div>
                {statusLabel(status)}
            </div >
            <div className="products" style={{ marginLeft: '40px', marginTop: '32px' }}>
                <div style={{ display: 'flex', height: '90px' }}>
                    <div style={{ display: 'flex', fontSize: '24px', gap: '16px', width: '50%' }}>
                        <img src={product ? product.images.image1 : ''} alt=""></img>
                        <div>{product ? product.name : ''}</div>
                    </div>
                    <div style={{ display: 'flex', fontSize: '20px', gap: '32px', justifyContent: 'flex-end', width: '50%' }}>
                        <div>{quantity}x</div>
                        <div style={{ fontWeight: '600' }}>{total / quantity} VND</div>
                    </div>
                </div>
            </div>
            <div className="total">
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.5)", display: 'flex', fontSize: '20px', fontWeight: '600', justifyContent: 'flex-end', width: '30%' }}>
                    {total} VND
                </div>
            </div>
            <div>Lời gửi từ {seller ? ` người mua: ${msgToShop ? msgToShop : ''}` : ` người bán: ${msgToUser ? msgToUser : ''}`}</div>
            <div className="function">
                {!seller ? (<></>)
                    : status == 0 ? (
                        <>
                            <Popover closeOnBlur={true}>
                                <PopoverTrigger>
                                    <Button onClick={() => setMessage('')} colorScheme="red" style={{ fontWeight: '400', padding: '32px 48px' }}>Xác nhận</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="message">
                                        <input placeholder="Đôi lời nhắn gửi" style={{ "flexGrow": "1" }} value={message} onChange={(e) => setMessage(e.target.value)}></input>
                                        <Button colorScheme="red" onClick={() => onConfirm(message)} >Gửi</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <Popover closeOnBlur={true}>
                                <PopoverTrigger>
                                    <Button onClick={() => setMessage('')} variant='outline' style={{ padding: '32px 48px' }}>Huỷ</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="message">
                                        <input placeholder="Đôi lời nhắn gửi" style={{ "flexGrow": "1" }} value={message} onChange={(e) => setMessage(e.target.value)}></input>
                                        <Button colorScheme="red" onClick={() => onCancel(message)}>Gửi</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </>
                    ) : <></>}
            </div>
        </div >
    )
}