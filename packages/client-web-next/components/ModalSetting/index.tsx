import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, Alert, Button } from 'antd';
import {
    selectIsSettingVisible,
    setIsSettingVisible,
} from '@/globals/features/globalSlice';
import {
    useProfileQuery,
    useUpdateProfileMutation,
} from '@/globals/services/authApi';
import styles from './ModalSetting.module.scss';
import { useEffect, FC, useState } from 'react';
import { debounce } from 'lodash-es';
import { diffObject } from '@/globals/utils';
import UploadAvatar from '../UploadAvatar';

const ModalSetting: FC = () => {
    const [form] = Form.useForm();
    const isSettingVisible = useSelector(selectIsSettingVisible);
    const dispatch = useDispatch();
    const { data: profile, refetch } = useProfileQuery();
    const [update] = useUpdateProfileMutation();
    const [cacheData, setDataCache] = useState({});
    useEffect(() => {
        profile && setDataCache(profile);
        isSettingVisible && profile && form.setFieldsValue(profile);
    }, [profile, isSettingVisible]);

    const formFileds = ['avatar', 'nickname', 'username', 'email', 'phone'];

    const handleCancel = () => {
        dispatch(setIsSettingVisible(false));
    };

    const [isSave, setIsSave] = useState(true);
    const [alerText, setAlerText] = useState('数据没变化，无需保存！');
    const [alertVisible, setAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        if (diffObject(cacheData, values)) {
            return;
        }
        setLoading(true);
        update(values)
            .then((res: any) => {
                if (res && res.data) {
                    setAlertVisible(true);
                    setAlerText('数据保存成功！');
                    setIsSave(true);
                    refetch();
                }
            })
            .catch(() => {
                setAlerText('数据保存失败！');
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
    };
    const handleBlue = () => {
        const formData = form.getFieldsValue(formFileds);
        if (diffObject(cacheData, formData)) {
            return;
        }
        form.submit();
    };

    const handleChange = debounce(() => {
        const formData = form.getFieldsValue(formFileds);
        setIsSave(diffObject(cacheData, formData));
    }, 200);

    const handleOk = () => {
        form.submit();
    };
    const handleAlerClose = () => {
        setAlertVisible(false);
    };

    const handleUploadFinish = () => {};
    return (
        <Modal
            width={600}
            open={isSettingVisible}
            title="我的设置"
            centered
            wrapClassName="modal-setting"
            onCancel={handleCancel}
            zIndex={2000}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    关闭
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    disabled={isSave}
                    loading={loading}
                    onClick={handleOk}>
                    保存
                </Button>,
            ]}>
            <div>
                <Form
                    form={form}
                    labelAlign="left"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    layout="horizontal">
                    <Form.Item label="头像" name="avatar" valuePropName="src">
                        <UploadAvatar
                            finish={handleUploadFinish}></UploadAvatar>
                    </Form.Item>
                    <Form.Item label="昵称" name="nickname">
                        <Input onBlur={handleBlue} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="用户名" name="username">
                        <Input onBlur={handleBlue} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="邮箱" name="email">
                        <Input onBlur={handleBlue} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="手机号" name="phone">
                        <Input onBlur={handleBlue} onChange={handleChange} />
                    </Form.Item>
                </Form>
            </div>
            {isSettingVisible && alertVisible ? (
                <Alert
                    showIcon
                    message={alerText}
                    type="success"
                    closable
                    afterClose={handleAlerClose}
                />
            ) : null}
        </Modal>
    );
};

export default ModalSetting;
