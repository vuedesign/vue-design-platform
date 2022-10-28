import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { CloseSmall } from '@icon-park/react';
import { selectIsLoginVisible, setOpen } from '@/globals/features/globalSlice';
import LoginPanel from '@/components/LoginPanel';
import RegisterPanel from '@/components/RegisterPanel';
import styles from './ModalAuth.module.scss';

const ModalAuth = () => {
    const isLoginVisible: boolean = useSelector(selectIsLoginVisible);
    const [model, setModel] = useState('login');
    const [title, setTitle] = useState('登录');
    const dispatch = useDispatch();
    const handleRegister = () => {
        setModel('register');
        setTitle('注册');
    };
    const handleLogin = () => {
        setModel('login');
        setTitle('登录');
    };
    return (
        <Modal width={360} closable={false} open={isLoginVisible} footer={null}>
            <header className={styles['modal-auth-header']}>
                <h5>{title}</h5>
                <span onClick={() => dispatch(setOpen(false))}>
                    <CloseSmall theme="filled" size="20" />
                </span>
            </header>
            {model === 'login' && (
                <LoginPanel
                    finish={() => dispatch(setOpen(false))}
                    register={handleRegister}
                />
            )}
            {model === 'register' && (
                <RegisterPanel
                    finish={() => dispatch(setOpen(false))}
                    login={handleLogin}
                />
            )}
        </Modal>
    );
};

export default ModalAuth;
