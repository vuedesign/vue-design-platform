import { Divider, Form, Input, Button, Checkbox } from 'antd';
import { User, Lock } from '@icon-park/react';
import { useDispatch } from 'react-redux';
import { TOKEN_KEY } from '@/configs/globals.contants';
import { useRegisterMutation } from '@/modules/services/authApi';
import { LoginRequest } from '@/modules/types/auth';
import { setToken, setUser } from '@/modules/features/authSlice';
import { useState } from 'react';

type RegisterPanelProps = {
    finish?: () => void;
};

const RegisterPanel = ({ finish }: RegisterPanelProps) => {
    const [form] = Form.useForm();
    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();

    const onFinish = (values: LoginRequest) => {
        register(values).then((res: any) => {
            console.log('res', res, values);
            if (res && res.data) {
                finish && finish();
            }
        });
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
                    <Button
                        type="link"
                        block
                        onClick={() => finish && finish()}>
                        马上登录
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterPanel;
