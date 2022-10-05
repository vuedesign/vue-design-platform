import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { message, Upload, Avatar } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

type UploadAvatarProps = {
    src?: string;
    finish: (url: string) => void;
};
const UploadAvatar: React.FC<UploadAvatarProps> = ({ src = '', finish }) => {
    const [loading, setLoading] = useState(false);
    console.log('srcsrcsrcsrc', src);
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        src && setImageUrl(src);
    }, [src]);
    console.log('imageUrl', imageUrl);

    const handleChange: UploadProps['onChange'] = (
        info: UploadChangeParam<UploadFile>,
    ) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
                finish && finish(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}>
            {imageUrl ? (
                <Avatar size={64} icon={<UserOutlined />} src={imageUrl} />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};

export default UploadAvatar;
