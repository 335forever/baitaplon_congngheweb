import './index.css'
import React from 'react'
import axios from 'axios'
import brand from '../assets/images/brand.svg'
import { Button, ChakraProvider, Link, useToast } from '@chakra-ui/react'

const actions = ['signin', 'signup']

export default function Login(props) {
    const [confirm, setConfirm] = React.useState(true)
    const [mode, setMode] = React.useState(0);
    const [isSeller, setSeller] = React.useState(false);
    const [form, setForm] = React.useState({
        action: actions[mode],
        username: null,
        password: null,
        name: null,
        email: null,
        dob: null,
        phone: null,
        address: null
    })
    const [message, setMessage] = React.useState();
    const toast = useToast();

    const logout = () => {
        localStorage.removeItem('token');
        setMode(0);
    }

    const sign = async () => {
        if (validate()) {
            setMessage(null);
            await axios.post('https://ducquan.id.vn/congngheweb/santhuongmai/api.php', {
                ...form,
                action: actions[mode]
            }).then(res => {
                localStorage.setItem('token', res.data.token)
                toast({ title: mode === 0 ? "Đăng nhập thành công!" : "Đăng ký thành công!", duration: 1000, isClosable: false, status: 'success' })
                console.log(res);
            }).catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 409:
                            toast({ title: 'Lỗi', description: 'Tên đăng nhập đã tồn tại', duration: 3000, isClosable: true, status: 'error' })
                            break;
                        default:
                            toast({ title: 'Lỗi', description: err.message, duration: 3000, isClosable: true, status: 'warning' })
                    }
                } else if (err.request) {
                    // The request was made but no response was received
                    toast({ title: 'Lỗi', description: 'Không nhận được phản hồi từ máy chủ', duration: 3000, isClosable: true, status: 'error' })
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast({ title: 'Lỗi', description: 'Lỗi khi thiết lập yêu cầu', duration: 3000, isClosable: true, status: 'error' })
                }
            });
        }
    }


    const validate = () => {
        if (!form.username) {
            toast({ title: "Lỗi", description: "Bạn chưa nhập username", status: 'error', duration: 3000, isClosable: true });
            return false;
        } else if (!form.password) {

            toast({ title: "Lỗi", description: "Bạn chưa nhập mật khẩu", status: 'error', duration: 3000, isClosable: true });
            return false;
        } else if (form.password.length < 8) {
            toast({ title: 'Cảnh báo', description: 'Mật khẩu phải có ít nhất 8 ký tự', status: 'warning', duration: 3000, isClosable: true });
        }

        if (mode === 1) {
            if (!form.name) {
                toast({ title: "Lỗi", description: "Bạn chưa nhập họ tên", status: 'error', duration: 3000, isClosable: true });
                return false;
            } else if (!form.dob) {
                toast({ title: "Lỗi", description: "Bạn chưa nhập ngày sinh", status: 'error', duration: 3000, isClosable: true });
                return false;
            } else if (!form.phone) {
                toast({ title: "Lỗi", description: "Bạn chưa nhập số điện thoại", status: 'error', duration: 3000, isClosable: true });
                return false;
            } else if (!form.address) {
                toast({ title: "Lỗi", description: "Bạn chưa nhập địa chỉ", status: 'error', duration: 3000, isClosable: true });
                return false;
            }
        }

        return true;
    }

    return localStorage.getItem('token') == null ? (
        <ChakraProvider>
            <div id='wrapper'>
                <img src={brand} id='brand' />

                <div id='account' >
                    <div id='sign'>
                        <div id='title'>{mode == 0 ? 'Đăng nhập' : 'Đăng ký'}</div>
                        <p>{mode == 0 ? 'Nhập tài khoản và mật khẩu' : 'Điền các thông tin của bạn'}</p>
                        <div>
                            <input type='text' placeholder='Tên đăng nhập' style={{ width: '100%' }} onChange={(e) => setForm({ ...form, username: e.target.value })} onKeyDown={(e) => e.key === 'Enter' ? sign() : null} />
                        </div>
                        <div>
                            <input type='password' placeholder='Mật khẩu' style={{ width: '100%' }} onChange={(e) => setForm({ ...form, password: e.target.value })} onKeyDown={(e) => e.key === 'Enter' ? sign() : null} />
                        </div>
                        <div style={{ display: mode === 0 ? 'none' : 'flex' }}>
                            <input type='password' placeholder='Xác nhận mật khẩu' style={{ width: '100%' }} onChange={(e) => setConfirm(e.target.value == form.password)} />
                        </div>
                        <p style={{ color: 'red', fontFamily: 'Roboto', fontSize: '12px' }}>{confirm ? '' : 'Không khớp'}</p>
                        <div style={{ display: mode === 0 ? 'none' : 'flex', marginBottom: '10px' }}>
                            <input type='text' placeholder='Họ tên' style={{ width: '100%' }} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div style={{ display: mode === 0 ? 'none' : 'flex' }}>
                            <input type='text' placeholder='Ngày sinh' style={{ width: '100%' }}
                                onFocus={(e) => {
                                    e.target.type = 'date';
                                    e.target.placeholder = '';
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        e.target.type = 'text';
                                        e.target.placeholder = 'Ngày sinh';
                                    }
                                }}
                                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                            />
                        </div>
                        <div style={{ display: mode === 0 ? 'none' : 'flex' }}>
                            <input type='text' placeholder='Số điện thoại' style={{ width: '100%' }} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                        <div style={{ display: mode === 0 ? 'none' : 'flex' }}>
                            <input type='text' placeholder='Địa chỉ' style={{ width: '100%' }} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                        </div>
                        <div style={{ display: mode === 0 ? 'none' : 'flex' }}>
                            <input type='text' placeholder='Email' style={{ width: '100%' }} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                    </div>
                    <div className='option' id='signUpSuggest'>
                        <label>Bạn chưa có tài khoản?</label>
                        <Link color='red' onClick={() => setMode(prev => 1 - prev)}>{mode === 0 ? 'Đăng ký' : 'Đăng nhập'}</Link>
                    </div>
                    <div className='option' display={mode === 0 ? 'none' : 'flex'} >
                        <Button colorScheme='red' color='white' fontFamily='Quicksand' fontWeight='500' onClick={sign} padding='2rem 2.5rem' variant='solid'>{mode === 0 ? 'Đăng nhập' : 'Đăng ký'}</Button>
                        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', width: '50%' }}><Link color='red'>Quên mật khẩu?</Link></div>
                    </div>
                </div>
            </div >
        </ChakraProvider >
    ) : (<div>
        <p>Bạn đã đăng nhập</p>
        <button onClick={logout}>Đăng xuất</button>
    </div>)
}

