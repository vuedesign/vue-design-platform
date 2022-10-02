import { Divider, Form, Input, Button, Checkbox } from 'antd';
import { useRouter } from 'next/router';
import { User, Lock } from '@icon-park/react';
import { useDispatch } from 'react-redux';
import { TOKEN_KEY } from '@/configs/globals.contants';
import {
    useLoginMutation,
    usePublicKeyMutation,
} from '@/modules/services/authApi';
import type {
    DataResponse,
    LoginRequest,
    UserResponse,
    BufferJSON,
} from '@/modules/types';
import { setToken, setUser } from '@/modules/features/authSlice';
import { useEffect, useState } from 'react';
import { encrypt } from '@/modules/utils';

type LoginPanelProps = {
    finish?: () => void;
    register?: () => void;
};

const LoginPanel = ({ finish, register }: LoginPanelProps) => {
    const [getPublicKey] = usePublicKeyMutation();
    const [form] = Form.useForm();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const onFinish = async ({ account, password }: LoginRequest) => {
        const { data: publicKeyBuffer } =
            (await getPublicKey()) as DataResponse<BufferJSON>;
        const { data: auth } = (await login({
            account,
            password: encrypt(password, publicKeyBuffer),
        })) as DataResponse<UserResponse>;
        if (auth && auth.token) {
            window.localStorage.setItem(TOKEN_KEY, auth.token);
            dispatch(setToken(auth.token));
            dispatch(setUser(auth.user));
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

    const [account, setAccount] = useState('wujian12');
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
