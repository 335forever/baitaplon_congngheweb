import icCancelled from "../../assets/images/ic_cancelled.svg"
import icDelivered from "../../assets/images/ic_delivered.svg"
import icDelivering from "../../assets/images/ic_delivering.svg"
import icProcessing from "../../assets/images/ic_processing.svg"
import icShop from "../../assets/images/ic_shop.svg"
import icUser from "../../assets/images/ic_user.svg";

import { Button, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react"

export default function Order({ name, status, products, seller }) {
    const statusLabel = (status) => {
        switch (status) {
            case 0:
                return (
                    <div className="status" >
                        <div className="status-inner" style={{ backgroundColor: '#FFE5EC', color: '#FF316A' }}>
                            <img src={icCancelled} alt="err" />
                            Đã hủy
                        </div >
                    </div >
                )
            case 1:
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

    var s = 0

    console.log(name + '-' + status)

    return (
        <div className="order">
            <div className="title">
                <div className="lefttitle" style={{ display: 'flex', width: '50%' }}>
                    <img src={seller ? icUser : icShop} />
                    <div className="shopName">{name}</div>
                </div>
                {statusLabel(status)}
            </div >
            <div className="products" style={{ marginLeft: '40px', marginTop: '32px' }}>
                {products.map((e, index) => {
                    s += e.quantity * e.price;
                    return (<div key={index} style={{ display: 'flex', height: '90px' }}>
                        <div style={{ display: 'flex', fontSize: '24px', gap: '16px', width: '50%' }}>
                            <img src={e.image} alt="Can't load"></img>
                            <div>{e.name}</div>
                        </div>
                        <div style={{ display: 'flex', fontSize: '20px', gap: '32px', justifyContent: 'flex-end', width: '50%' }}>
                            <div>{e.quantity}x</div>
                            <div style={{ fontWeight: '600' }}>{e.price} VND</div>
                        </div>
                    </div>)
                })}
            </div>
            <div className="total">
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.5)", display: 'flex', fontSize: '20px', fontWeight: '600', justifyContent: 'flex-end', width: '30%' }}>
                    {s} VND
                </div>
            </div>
            <div className="function">
                {!seller ? (<Button colorScheme="red" style={{ fontWeight: '400', padding: '32px 48px' }}>Mua lại</Button>)
                    : status == 1 ? (
                        <>
                            <Popover closeOnBlur={true}>
                                <PopoverTrigger>
                                    <Button colorScheme="red" style={{ fontWeight: '400', padding: '32px 48px' }}>Xác nhận</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="message">
                                        <input placeholder="Đôi lời nhắn gửi" style={{ "flexGrow": "1" }}></input>
                                        <Button colorScheme="red">Gửi</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <Popover closeOnBlur={true}>
                                <PopoverTrigger>
                                    <Button variant='outline' style={{ padding: '32px 48px' }}>Huỷ</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="message">
                                        <input placeholder="Đôi lời nhắn gửi" style={{ "flexGrow": "1" }}></input>
                                        <Button colorScheme="red">Gửi</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </>
                    ) : <></>}
            </div>
        </div >
    )
}