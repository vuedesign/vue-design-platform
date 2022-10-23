import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, Alert, Button } from 'antd';
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
import styles from './ModalPush.module.scss';
import { useEffect, FC, useState } from 'react';
import { debounce } from 'lodash-es';
import { diffObject } from '@/globals/utils';
import UploadAvatar from '../UploadAvatar';
import {
    selectInfo,
    selectImgWrapWidth,
    selectUser,
    setInfo,
    selectVisible,
    setVisible,
} from '@/globals/features/pluginSlice';
import ModalItem from './ModalItem';
import { Info } from './useStore';
import { parse } from 'qs';

const ModalPush: FC = () => {
    const dispatch = useDispatch();
    const info = useSelector(selectInfo);
    const visible = useSelector(selectVisible);
    const imgWrapWidth = useSelector(selectImgWrapWidth);
    const user = useSelector(selectUser);
    const handleUploadFinish = () => {};
    const handleSelectLogo = (img: any) => {};
    const handleCancel = () => {
        dispatch(setVisible(false));
    };

    return (
        <Modal width={600} open={visible} onCancel={handleCancel}>
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
