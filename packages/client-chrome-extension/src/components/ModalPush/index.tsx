import { useDispatch, useSelector } from 'react-redux';
import { Modal, message, Button, Input } from 'antd';
import {
    Home,
    Close,
    TagOne,
    TipsOne,
    Send,
    BrowserChrome,
} from '@icon-park/react';
import {
    useProfileQuery,
    useUpdateProfileMutation,
} from '@/globals/services/authApi';
import { SiteItem } from '@/globals/types/site';
import styles from './ModalPush.module.scss';
import { useEffect, FC, useState } from 'react';
import { debounce } from 'lodash-es';
import { diffObject, base64toFile } from '@/globals/utils';
import UploadAvatar from '../UploadAvatar';
import {
    selectInfo,
    selectImgWrapWidth,
    selectUser,
    setInfo,
    selectVisible,
    setVisible,
    Info,
} from '@/globals/features/pluginSlice';
import { selectCookie } from '@/globals/features/globalSlice';
import ModalItem from './ModalItem';
import { details } from '@/configs/globals.contants';
import { CloseOutlined } from '@ant-design/icons';
import './style.scss';

function uploadFileData<T = FormData, R = any>(formData: FormData) {
    return Promise.resolve(1);
}

function uploadFile(base64: string): Promise<any> {
    const file = base64toFile(base64);
    if (!file) {
        return Promise.resolve(null);
    }
    const formData: FormData = new FormData();
    formData.append('file', file);
    return uploadFileData<FormData, any>(formData);
}

const ModalPush: FC = () => {
    const dispatch = useDispatch();
    const info = useSelector(selectInfo);
    const cookie = useSelector(selectCookie);
    const visible = useSelector(selectVisible);
    const imgWrapWidth = useSelector(selectImgWrapWidth);
    const [loading, setLoading] = useState(false);
    const handleUploadFinish = () => {};

    const handleCancel = () => {
        dispatch(setVisible(false));
    };

    const handleOk = async () => {
        console.log('cookie', cookie);
        if (!cookie) {
            message.warning('您未登录，请点击右上角「登录/注册」按钮！');
            return;
        }
        setLoading(true);
        // const { createSite, findSite } = useSite();

        const fileRes = await uploadFile(info.thumbUrl);

        console.log('fileRes', fileRes);

        const item: SiteItem = {
            codeUrl: info.codeUrl,
            collections: 0,
            description: info.description,
            down: 0,
            iconUrl: info.favIconUrl,
            logoUrl: info.logoUrl,
            siteUrl: info.siteUrl,
            tags: info.tags.map((i) => ({ name: i })),
            thumbUrl: fileRes.path,
            title: info.title,
            top: 0,
            type: info.type || 'site',
            views: 0,
            status: 1,
        };
        setTimeout(() => {
            setLoading(false);
        }, 10000);
        console.log(item);
    };

    console.log('Modal info', info);
    return (
        <Modal
            wrapClassName="vue-design-modal-push"
            width={600}
            open={visible}
            onCancel={handleCancel}
            onOk={handleOk}
            title={
                <dl className={styles['vue-design-modal-title']}>
                    <dt>
                        <img src={info.favIconUrl} />
                    </dt>
                    <dd>{info.siteUrl}</dd>
                </dl>
            }
            footer={[
                <Button
                    key="back"
                    shape="round"
                    icon={
                        <Close
                            className="anticon"
                            theme="filled"
                            size="14"
                            style={{
                                height: '16px',
                            }}
                        />
                    }
                    onClick={handleCancel}>
                    关闭
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    shape="round"
                    icon={
                        <Send
                            className="anticon"
                            theme="filled"
                            size="14"
                            style={{
                                height: '16px',
                            }}
                        />
                    }
                    loading={loading}
                    onClick={handleOk}>
                    提交
                </Button>,
            ]}>
            <div className={styles['vue-design-modal-content']}>
                <div className={styles['vue-design-modal-main']}>
                    <div className={styles['vue-design-modal-item']}>
                        <ModalItem {...info} />
                    </div>
                    <div className={styles['vue-design-modal-info']}>
                        <dl>
                            <dt>官网</dt>
                            {info.siteUrl && (
                                <dd>
                                    <Home
                                        theme="outline"
                                        size={16}
                                        fill="#A6A6A6"
                                    />
                                    <a href={info.siteUrl}>{info.siteUrl}</a>
                                </dd>
                            )}
                        </dl>
                        <dl>
                            <dt>标题</dt>
                            {info.title && (
                                <dd>
                                    <TipsOne
                                        theme="outline"
                                        size="16"
                                        fill="#A6A6A6"
                                    />
                                    <p>{info.title}</p>
                                </dd>
                            )}
                        </dl>
                        {info.tags && info.tags.length > 0 && (
                            <dl>
                                <dt>标签</dt>
                                <dd>
                                    <TagOne
                                        theme="outline"
                                        size="16"
                                        fill="#A6A6A6"
                                    />
                                    <div>
                                        {info.tags.map((tag, i) => {
                                            return (
                                                <span
                                                    className={
                                                        styles['ellipsis']
                                                    }
                                                    key={i}>
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </dd>
                            </dl>
                        )}
                        {info.description && (
                            <dl>
                                <dt>关于</dt>
                                <dd>
                                    <TipsOne
                                        theme="outline"
                                        size="16"
                                        fill="#A6A6A6"
                                    />
                                    <p>{info.description}</p>
                                </dd>
                            </dl>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalPush;
