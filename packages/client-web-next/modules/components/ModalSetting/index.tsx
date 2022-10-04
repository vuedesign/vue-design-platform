import { useDispatch, useSelector } from 'react-redux';
import { Modal, Avatar, Form, Input, Button } from 'antd';
import { CloseSmall } from '@icon-park/react';
import { UserOutlined } from '@ant-design/icons';
import {
    selectIsSettingVisible,
    setIsSettingVisible,
} from '@/modules/features/globalSlice';
import {
    useProfileQuery,
    useLogoutMutation,
    profile,
} from '@/modules/services/authApi';
import styles from './ModalSetting.module.scss';
import { useEffect, FC } from 'react';

const ModalSetting: FC = () => {
    const [form] = Form.useForm();
    const isSettingVisible = useSelector(selectIsSettingVisible);
    const dispatch = useDispatch();
    const { data: profile } = useProfileQuery();
    const handleOk = () => {};
    const handleCancel = () => {
        dispatch(setIsSettingVisible(false));
    };
    useEffect(() => {
        console.log('profile', profile);
        isSettingVisible && profile && form.setFieldsValue(profile);
    }, [profile, isSettingVisible]);
    return (
        <Modal
            width={528}
            open={isSettingVisible}
            title="我的设置"
            centered
            onOk={handleOk}
            onCancel={handleCancel}
            wrapClassName="modal-setting"
            zIndex={2000}
            footer={[
                <Button key="back" shape="round" onClick={handleCancel}>
                    关闭
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    shape="round"
                    onClick={handleOk}>
                    保存
                </Button>,
            ]}>
            <div>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal">
                    <Form.Item label="头像" name="avatar" valuePropName="src">
                        <Avatar size={48} icon={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item label="昵称" name="nickname">
                        <Input />
                    </Form.Item>
                    <Form.Item label="用户名" name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item label="邮箱" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="手机号" name="phone">
                        <Input />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default ModalSetting;
