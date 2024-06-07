import icShop from "../../assets/images/ic_shop.svg"
import icDelivered from "../../assets/images/ic_delivered.svg"
import icDelivering from "../../assets/images/ic_delivering.svg"
import icProcessing from "../../assets/images/ic_processing.svg"
import icCancelled from "../../assets/images/ic_cancelled.svg"
import { Button } from "@chakra-ui/react"

export default function Order({ shop, status, products }) {
    const statusLabel = (status) => {
        switch (status) {
            case 4:
                return (
                    <div className="status" >
                        <div className="status-inner" style={{ backgroundColor: '#FFE5EC', color: '#FF316A' }}>
                            <img src={icCancelled} alt="err" />
                            Đã hủy
                        </div >
                    </div >
                )
            case 3:
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
                    <div className="status">
                        <div className="status-inner" style={{ backgroundColor: '#CAF6F9', color: '#129199' }}>
                            <img src={icDelivering} alt="err" />
                            Đang giao
                        </div>
                    </div >
                )
            case 1:
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

    return (
        <div className="order">
            <div className="title">
                <div className="lefttitle" style={{ display: 'flex', width: '50%' }}>
                    <img src={icShop} />
                    <div className="shopName">{shop}</div>
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
                    {s}
                </div>
            </div>
            <div className="function">
                <Button colorScheme="red" style={{ fontWeight: '400', padding: '32px 48px' }}>Mua lại</Button>
                {(status == 4) ? <Button variant='outline' style={{ padding: '32px 48px' }}>Đánh giá</Button> : <></>}
            </div>
        </div >
    )
}