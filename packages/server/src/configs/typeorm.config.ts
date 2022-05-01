import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import mysqlConfig from './mysql.config';

const env: string = process.env.NODE_ENV || 'local';
const config: TypeOrmModuleOptions = Object.assign({}, mysqlConfig.default, mysqlConfig[env]);

export default config;