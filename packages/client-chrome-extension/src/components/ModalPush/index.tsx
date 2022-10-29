import { useDispatch, useSelector } from 'react-redux';
import { Modal, message, Form, Input, Alert, Button } from 'antd';
import {
    Home,
    Star,
    TagOne,
    Github,
    BrowserChrome,
    TipsOne,
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

    const handleSelectLogo = (img: any) => {
        dispatch(
            setInfo({
                ...info,
                logoUrl: img,
            }),
        );
    };

    const handleOk = async () => {
        console.log('cookie', cookie);
        if (!cookie) {
            message.warning('您未登录，请点击右上角「登录/注册」按钮！');
            return;
        }
        if (!info.logoUrl && info.imgs.some((img) => !!img)) {
            message.warning('请点击选择下面图片作为网站icon！');
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
            type: info.type,
            views: 0,
            status: 1,
        };
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        console.log(item);
    };

    return (
        <Modal
            width={600}
            open={visible}
            onCancel={handleCancel}
            onOk={handleOk}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    取消
                </Button>,
                <Button
                    key="submit"
                    type="primary"
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
                            <dt>类型</dt>
                            {info.type === 'code' ? (
                                <dd>
                                    <Github
                                        theme="outline"
                                        size="16"
                                        fill="#A6A6A6"
                                    />
                                    <span>代码</span>
                                </dd>
                            ) : (
                                <dd>
                                    <BrowserChrome
                                        theme="outline"
                                        size="16"
                                        fill="#A6A6A6"
                                    />
                                    <span>网站</span>
                                </dd>
                            )}
                        </dl>
                        {info.star && (
                            <dl>
                                <dt>星星</dt>
                                <dd>
                                    <Star
                                        theme="outline"
                                        size="16"
                                        fill="#A6A6A6"
                                    />
                                    <span>{info.star}</span>
                                </dd>
                            </dl>
                        )}

                        {info.siteUrl && (
                            <dl>
                                <dt>官网</dt>
                                <dd>
                                    <Home
                                        theme="outline"
                                        size={16}
                                        fill="#A6A6A6"
                                    />
                                    <a href={info.siteUrl}>{info.siteUrl}</a>
                                </dd>
                            </dl>
                        )}
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
                    </div>
                </div>
                <div className={styles['vue-design-modal-img-list']}>
                    <ul style={{ width: `${imgWrapWidth}px` }}>
                        {info &&
                            info.imgs &&
                            info.imgs.map((img, i) => {
                                return (
                                    <li
                                        className={
                                            img === info.logoUrl
                                                ? styles.active
                                                : undefined
                                        }>
                                        <span
                                            onClick={() =>
                                                handleSelectLogo(img)
                                            }>
                                            {img && <img src={img} />}
                                        </span>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </Modal>
    );
};

export default ModalPush;
