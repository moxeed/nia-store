import 'reflect-metadata'
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { Label } from '../product/entities/label';
import {Picture, Product, Specification} from '../product/entities/product';
import { Option } from '../product/entities/option';

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "1234",
    database: "nia_store",
    synchronize: true,
    logging: true,
    entities: [Product, Option, Label, Picture, Specification],
})

export const getConnection = async (): Promise<DataSource> => {

    if (AppDataSource.isInitialized) {
        return AppDataSource;
    }

    return await AppDataSource.initialize();
}

export const getRepository = async <Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Promise<Repository<Entity>> => {
    const connection = await getConnection();
    return connection.getRepository(target);
}

