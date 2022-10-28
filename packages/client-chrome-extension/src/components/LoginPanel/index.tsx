import { Divider, Form, Input, Button, Checkbox } from 'antd';
import { User, Lock } from '@icon-park/react';
import { useDispatch } from 'react-redux';
import { details, TOKEN_KEY } from '@/configs/globals.contants';
import {
    useLoginMutation,
    usePublicKeyMutation,
    profile,
} from '@/globals/services/authApi';
import type {
    DataResponse,
    LoginRequest,
    UserResponse,
    BufferJSON,
} from '@/globals/types';
import { setToken, setUser } from '@/globals/features/authSlice';
import { setLoginState } from '@/globals/features/globalSlice';
import { useEffect, useState } from 'react';
import { encrypt } from '@/globals/utils';
import { AppDispatch } from '@/globals/store';

type LoginPanelProps = {
    finish?: () => void;
    register?: () => void;
};

const LoginPanel = ({ finish, register }: LoginPanelProps) => {
    const [getPublicKey] = usePublicKeyMutation();
    const [form] = Form.useForm();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch<AppDispatch>();

    const onFinish = async ({ account, password }: LoginRequest) => {
        const { data: publicKeyBuffer } =
            (await getPublicKey()) as DataResponse<BufferJSON>;
        const { data: auth } = (await login({
            account,
            password: encrypt(password, publicKeyBuffer),
        })) as DataResponse<UserResponse>;
        if (auth && auth.token) {
            dispatch(setToken(auth.token));
            dispatch(setUser(auth.user));
            dispatch(setLoginState());
            try {
                chrome.cookies.set({
                    ...details,
                    value: auth.token,
                });
            } catch (error) {}
            finish && finish();
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const rules = {
        account: [{ required: true, message: '请输入用户名称!' }],
        password: [{ required: true, message: '请输入用户密码!' }],
    };

    const [account, setAccount] = useState('18602042484');
    const [password, setPassword] = useState('wujian');

    return (
        <>
            <Form
                form={form}
                name="basic"
                initialValues={{
                    remember: true,
                    account,
                    password,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item name="account" rules={rules.account}>
                    <Input prefix={<User />} />
                </Form.Item>

                <Form.Item name="password" rules={rules.password}>
                    <Input.Password prefix={<Lock />} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        loading={isLoading}>
                        登录
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="link" block onClick={register}>
                        马上注册
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginPanel;
