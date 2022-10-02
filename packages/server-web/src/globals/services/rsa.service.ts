import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import NodeRSA from 'node-rsa';
const NodeRSA = require('node-rsa');

// // 查看 https://github.com/rzcoder/node-rsa/issues/91
// key.setOptions({ encryptionScheme: 'pkcs1' }); // 必须加上，加密方式问题。
// // const privateKey = key.exportKey('private');
// key.importKey(`-----BEGIN RSA PRIVATE KEY-----
// MIICXAIBAAKBgQC9h2BtInlMMiutMouv2mlXBl3pbgMnsem0wudg10QIeF/EsVy/
// 54CzxJczv7KyPbRGFmDyUveoTsKYekcsh7bwOSKE/BA8e3xO8o55Ggdx4OE7LRAV
// yM/oH4tZPWDuMsOelWPZPHLvBggY2YT0MixUaDC/tpXyQaLws2SF/keJ8wIDAQAB
// AoGAP26FmUEGc7f+4jKeibaBtvyMhcmqCKkE3Ni2c7TYMjWHZ98seZXTf1b2e/1W
// o0z/fs2SmMen1460li+mjoLFeMEel5rI21yh0UBiJM1fd+BnQqu1ki49C/tEtNf+
// TYYF0j+KZg/XrewiANniQr/Xsvf+iyRLb4sjnuBzqpJjKtECQQDoa+yENf/gNtQ5
// H35nDVOx3nawyZY6MfzELkUumK682RP67W17mTjb6irouE3IZdnPZ0pFVfvw9Fty
// z1gsuNxFAkEA0MGC9BPGYaXQ+TaFzeNYGTf/85PPjhDPUY01tbdaduGBLisBTrsQ
// tpgv9ItsSdxLfqYUyyjO2/RgrvzVC6Mc1wJBAJHHb5gVjqKBgWc627ujXkWINYX5
// SuLBi7s5EmeBmMgWmDOhTDRkDIfTPoqtXww85fry3GDU56tgeSNv7exPHskCQELU
// wMzNC+S1BhrSprGMR+cC85ESUA9GOGj+USSUx4Rpm0ahg/ClmKssO6YJgKiAuzaX
// iu6jaN4n9U/wJ3BrTs8CQEkxM7nK/sQ2ZjnCUNrVkmLq0aqmjLo/d/AXEls4AQ0h
// E8H9COH3pAhIlS4tdJR7hN9DS19aQqrNeS6PrHrpeEQ=
// -----END RSA PRIVATE KEY-----`);

// export function decrypt(data: string): string {
//     const decrypted = key.decrypt(data, 'utf8');
//     return decrypted;
// }

// export default key;

@Injectable()
export class RsaService {
    private key: typeof NodeRSA;
    constructor(private readonly configService: ConfigService) {
        this.key = new NodeRSA({ b: 1024 });
        this.key.setOptions({ encryptionScheme: 'pkcs1' });
        const privateKey = this.configService.get('PRIVATE_KEY');
        this.key.importKey(privateKey);
    }

    decrypt(data: string): string {
        const decrypted = this.key.decrypt(data, 'utf8');
        return decrypted;
    }

    sign(data: string): Buffer {
        const key = new NodeRSA({ b: 1024 });
        key.setOptions({ encryptionScheme: 'pkcs1' });
        const publicKey = this.configService.get('PUBLIC_KEY');
        key.importKey(publicKey);
        return key.sign(data);
    }

    verify(data: string, sign: any): boolean {
        return this.key.verify(data, sign);
    }
}
