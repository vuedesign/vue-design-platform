import { useDispatch, useSelector } from 'react-redux';
import { Modal, Avatar, Form, Input, Button } from 'antd';
import { CloseSmall, DataAll } from '@icon-park/react';
import { UserOutlined } from '@ant-design/icons';
import {
    selectIsSettingVisible,
    setIsSettingVisible,
} from '@/modules/features/globalSlice';
import {
    useProfileQuery,
    useUpdateProfileMutation,
} from '@/modules/services/authApi';
import styles from './ModalSetting.module.scss';
import { useEffect, FC, useState } from 'react';
import { debounce } from 'lodash-es';
import { diffObject } from '@/modules/utils';
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

    const editor = new Map([
        ['close', '关闭'],
        ['edit', '编辑中...'],
        ['save', '保存中...'],
    ]);
    const [editState, setEditState] = useState<'close' | 'edit' | 'save'>(
        'close',
    );

    const onFinish = (values: any) => {
        if (diffObject(cacheData, values)) {
            setEditState('close');
            return;
        }
        setEditState('save');
        update(values)
            .then((res: any) => {
                if (res && res.data) {
                    refetch();
                }
            })
            .catch(() => {})
            .finally(() => {
                setTimeout(() => {
                    setEditState('close');
                }, 300);
            });
    };

    const handleFocus = () => {
        setEditState('edit');
    };
    let timer: ReturnType<typeof setTimeout>;
    const handleBlue = () => {
        const formData = form.getFieldsValue(formFileds);
        if (diffObject(cacheData, formData)) {
            setEditState('close');
            return;
        }
        form.submit();
    };

    const handleChange = debounce(() => {
        setEditState('edit');
        form.submit();
    }, 500);

    const handleOk = () => {
        if (editState === 'close') {
            handleCancel();
        } else if (editState === 'save') {
            form.submit();
        }
    };

    return (
        <Modal
            width={528}
            open={isSettingVisible}
            title="我的设置"
            centered
            onCancel={handleCancel}
            wrapClassName="modal-setting"
            zIndex={2000}
            footer={[
                <Button key="submit" shape="round" onClick={handleOk}>
                    {editor.get(editState)}
                </Button>,
            ]}>
            <div>
                <Form
                    form={form}
                    labelAlign="left"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={onFinish}
                    layout="horizontal">
                    <Form.Item label="头像" name="avatar" valuePropName="src">
                        <UploadAvatar></UploadAvatar>
                    </Form.Item>
                    <Form.Item label="昵称" name="nickname">
                        <Input
                            bordered={false}
                            onBlur={handleBlue}
                            onFocus={handleFocus}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="用户名" name="username">
                        <Input
                            bordered={false}
                            onBlur={handleBlue}
                            onFocus={handleFocus}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="邮箱" name="email">
                        <Input
                            bordered={false}
                            onBlur={handleBlue}
                            onFocus={handleFocus}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="手机号" name="phone">
                        <Input
                            bordered={false}
                            onBlur={handleBlue}
                            onFocus={handleFocus}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default ModalSetting;
