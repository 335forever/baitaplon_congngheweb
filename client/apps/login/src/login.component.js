import './index.css'
import React from 'react'
import axios from 'axios'
import brand from '../assets/images/brand.svg'
import { Button, ChakraProvider, useToast } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function Login(props) {
    const [form, setForm] = React.useState({
        action: 'signin',
        username: null,
        password: null,
        name: null,
        email: null,
        dob: null,
        isShoper: false,
        phone: null,
        address: null,
        taxid: null
    })
    const [message, setMessage] = React.useState();
    const toast = useToast();

    const logout = () => {
        localStorage.removeItem('token');
    }

    const sign = async () => {
        if (validate()) {
            setMessage(null);
            await axios.post('https://ducquan.id.vn/congngheweb/santhuongmai/api.php', {
                ...form,
                action: 'signin'
            }).then(res => {
                localStorage.setItem('token', res.data.token)
                toast({title: "Đăng nhập thành công!", duration: 1000, isClosable: false, status: 'success' })
                console.log(res);
            }).catch(err => {
                console.log(err);
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
        }
        
        return true;
    }

    return localStorage.getItem('token') == null ? (
        <ChakraProvider>
            <div id='wrapper'>
                <img src={brand} id='brand' />

                <div id='account' >
                    <div id='sign'>
                        <div id='title'>{'Đăng nhập'}</div>
                        <p>{'Nhập tài khoản và mật khẩu'}</p>
                        <div>
                            <input className="login-input"  type='text' placeholder='Tên đăng nhập' style={{ width: '100%' }} onChange={(e) => setForm({ ...form, username: e.target.value })} onKeyDown={(e) => e.key === 'Enter' ? sign() : null} />
                        </div>
                        <div>
                            <input className="login-input"  type='password' placeholder='Mật khẩu' style={{ width: '100%' }} onChange={(e) => setForm({ ...form, password: e.target.value })} onKeyDown={(e) => e.key === 'Enter' ? sign() : null} />
                        </div>
                        <div style={{display: 'none'}}>
                            <input className="login-input"  type='password' placeholder='Xác nhận mật khẩu' style={{ width: '100%' }} onChange={(e) => setConfirm(e.target.value == form.password)} />
                        </div>
                        <p style={{ color: 'red', fontFamily: 'Roboto', fontSize: '12px' }}>{confirm ? '' : 'Không khớp'}</p>
                        <div style={{ display: 'none', marginBottom: '10px' }}>
                            <input className="login-input"  type='text' placeholder='Họ tên' style={{ width: '100%' }} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div style={{ display: 'none' }}>
                            <input className="login-input"  type='text' placeholder='Ngày sinh' style={{ width: '100%' }}
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
                    </div>
                    <div className='option' id='signUpSuggest'>
                        <label>Bạn chưa có tài khoản?</label>
                        <Link color='red' to="/signup">Đăng ký</Link>
                    </div>
                    <div className='option' display={'none' } >
                        <Button colorScheme='red' color='white' fontFamily='Quicksand' fontWeight='500' onClick={sign} padding='2rem 2.5rem' variant='solid'>Đăng nhập</Button>
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

