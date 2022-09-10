import * as qiniu from 'qiniu';
import { Injectable } from '@nestjs/common';
import qiniuConfig from '@/configs/qiniu.config';

@Injectable()
export class QiniuService {
    private client: any;
    private uploadToken: string;
    private putExtra: any;
    private localhost: string;
    public constructor() {
        const { accessKeyId, accessKeySecret, bucket, localhost } = qiniuConfig;

        const mac = new qiniu.auth.digest.Mac(accessKeyId, accessKeySecret);
        const putPolicy = new qiniu.rs.PutPolicy({
            scope: bucket,
        });
        this.uploadToken = putPolicy.uploadToken(mac);
        this.client = new qiniu.form_up.FormUploader(
            new qiniu.conf.Config({
                zone: qiniu.zone.Zone_z2, // 华南 https://developer.qiniu.com/kodo/sdk/nodejs#upload-flow
            }),
        );
        this.putExtra = new qiniu.form_up.PutExtra();
        this.localhost = localhost;
    }

    public putOssFile(
        ossPath: string,
        localFile: string,
        options: Record<string, any> = {},
    ): Promise<Record<string, any>> {
        return new Promise((resolve, reject) => {
            this.client.putFile(
                this.uploadToken,
                ossPath,
                localFile,
                this.putExtra,
                (respErr, respBody, respInfo) => {
                    if (respErr) {
                        reject(respErr);
                        return;
                    }
                    if (respInfo.statusCode == 200) {
                        resolve(
                            Object.assign(
                                {},
                                {
                                    ...respBody,
                                    localhost: this.localhost,
                                },
                            ),
                        );
                    } else {
                        resolve(respBody);
                    }
                },
            );
        });
    }
}
