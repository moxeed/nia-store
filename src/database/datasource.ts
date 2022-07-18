import 'reflect-metadata'
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { Label } from '../product/entities/label';
import {Picture, Product, Specification} from '../product/entities/product';
import { Option } from '../product/entities/option';

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./storage/db.sqlite",
    entities: [Product, Option, Label, Picture, Specification],
    synchronize: true
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

