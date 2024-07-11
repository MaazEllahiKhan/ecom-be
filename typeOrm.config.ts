import { DataSource } from "typeorm";

export default new DataSource({
    migrationsTableName: 'migrations',
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: false,
    synchronize: false,
    entities: ['dist/src/entities/**/*{.ts,.js}'],
    migrations: ['dist/src/migrations/**/*{.ts,.js}'],
    subscribers: ['dist/src/subscriber/**/*{.ts,.js}'],
});


// export default 
// {
// 	"type": "mysql",
// 	"host": "localhost",
// 	"port": 3306,
// 	"username": "root",
// 	"password": "Root@1234",
// 	"database": "e_commerce",
// 	"logging": true,
// 	"entities": ["dist/entities/*.*"],
//     "autoLoadEntities": true,
// 	"migrations": ["dist/migration/*.js"],
// 	"cli": {
// 	  "migrationsDir": "src/migration"
// 	}
// };
  