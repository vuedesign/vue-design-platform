export default {
  default: {
    type: 'mysql',
    port: 3306,
    synchronize: true,
    autoLoadEntities: true,
    timezone: '+08:00',
  },
  local: {
    host: '127.0.0.1',
    username: 'root',
    password: 'wujian798',
    database: 'vue_desgin_dev',
    // entities: ["dist/**/*.entity{.ts,.js}"],
  },
  test: {},
  prod: {},
};
