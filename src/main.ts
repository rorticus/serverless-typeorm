import { getConnectionManager, Connection } from 'typeorm';
import Document from './entities/Document';
import * as uuid from 'uuid';
import { ServerlessMysqlDriver } from './ServerlessMysqlDriver';

async function main() {
    const connection = getConnectionManager().create({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        synchronize: true,
        entities: [
            Document
        ]
    });

    (connection as any).driver = new ServerlessMysqlDriver(connection);
    
    try {
        console.log('pre connection');
        await connection.connect();
        console.log('post connection');

        const repository = connection.getRepository(Document);
        const allDocuments = await repository.find();
        console.log(allDocuments);
        // await repository.save({
        //     id: uuid.v4(),
        //     name: `Document ${allDocuments.length + 1}`
        // });

        connection.close();
    } catch (e) {
        console.error(e);
    }    
}

main();