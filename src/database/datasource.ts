import 'reflect-metadata'
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { Label } from '../product/entities/label';
import {Picture, Product, Specification} from '../product/entities/product';
import { Tag } from '../product/entities/tag';

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./storage/db.sqlite",
    entities: [Product, Tag, Label, Picture, Specification],
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

