import {MysqlDriver} from 'typeorm/driver/mysql/MysqlDriver';
import mysqlFactory from 'serverless-mysql';

const mysql = mysqlFactory({
    config: {
        host: 'localhost',
        database: 'test',
        user: 'root',
        password: 'root'
    }
});

const wrappedDriver = {
    ...mysql,
    release: () => {}
}

export class ServerlessMysqlDriver extends MysqlDriver {
    obtainMasterConnection() {
        return Promise.resolve(wrappedDriver);
    }

    obtainSlaveConnection() {
        return Promise.resolve(wrappedDriver);
    }

    async disconnect() {
        console.log('disconnecting?');
        await mysql.end();
        console.log('disconnected!');
    }
}