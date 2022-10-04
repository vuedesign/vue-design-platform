import { Form, Input, Button } from 'antd';
import { User, Lock } from '@icon-park/react';
import {
    useRegisterMutation,
    usePublicKeyMutation,
} from '@/modules/services/authApi';
import type {
    DataResponse,
    LoginRequest,
    UserResponse,
    BufferJSON,
} from '@/modules/types';
import { useState } from 'react';
import { encrypt } from '@/modules/utils';

type RegisterPanelProps = {
    finish?: () => void;
    login?: () => void;
};

const RegisterPanel = ({ finish, login }: RegisterPanelProps) => {
    const [form] = Form.useForm();
    const [getPublicKey] = usePublicKeyMutation();
    const [register, { isLoading }] = useRegisterMutation();

    const onFinish = async ({ account, password }: LoginRequest) => {
        const { data: publicKeyBuffer } =
            (await getPublicKey()) as DataResponse<BufferJSON>;
        const { data: auth, error } = (await register({
            account,
            password: encrypt(password, publicKeyBuffer),
        })) as DataResponse<UserResponse>;
        if (error === 'undefined' && auth) {
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

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Form
                form={form}
                name="basic"
                initialValues={{
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
                <Form.Item>
                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        loading={isLoading}>
                        注册
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="link" block onClick={login}>
                        马上登录
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterPanel;
