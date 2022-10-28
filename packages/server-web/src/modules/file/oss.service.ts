import * as OSS from 'ali-oss';
import { Inject, Injectable } from '@nestjs/common';
import ossConfig from '@/configs/oss.config';

@Injectable()
export class OssService {
    private client: any;
    public constructor() {
        const { accessKeyId, accessKeySecret, bucket, region, endpoint } =
            ossConfig;
        this.client = new OSS({
            accessKeyId,
            accessKeySecret,
            bucket,
            region,
            endpoint,
        });
    }

    public async putOssFile(
        ossPath: string,
        localPath: string,
        options: Record<string, any> = {},
    ): Promise<string> {
        let res: any;
        try {
            res = await this.client.put(ossPath, localPath, options);
            console.log('put res', res);
            // await this.client.putACL(ossPath, 'public-read');
        } catch (error) {
            console.log('===put ', error);
            return '';
        }
        return res.url;
    }
}
