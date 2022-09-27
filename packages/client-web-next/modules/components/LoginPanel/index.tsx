import { Divider, Form, Input, Button, Checkbox } from 'antd';
import { User, Lock } from '@icon-park/react';
import { useDispatch } from 'react-redux';
import { TOKEN_KEY } from '@/configs/globals.contants';
import { useLoginMutation } from '@/modules/services/authApi';
import { LoginRequest } from '@/modules/types/auth';
import { setToken, setUser } from '@/modules/features/authSlice';
import { useState } from 'react';

type LoginPanelProps = {
    finish?: () => void;
};

const LoginPanel = ({ finish }: LoginPanelProps) => {
    const [form] = Form.useForm();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const onFinish = (values: LoginRequest) => {
        login(values).then((res: any) => {
            console.log('res', res, values);
            if (res && res.data && res.data.token) {
                window.localStorage.setItem(TOKEN_KEY, res.data.token);
                dispatch(setToken(res.data.token));
                dispatch(setUser(res.data.user));
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

    const [account, setAccount] = useState('18602042484');
    const [password, setPassword] = useState('string');

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
            </Form>
        </>
    );
};

export default LoginPanel;
