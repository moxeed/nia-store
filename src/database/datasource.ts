import 'reflect-metadata'
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { Label } from '../product/entities/label';
import { Picture } from '../product/entities/picture';
import { Product } from '../product/entities/product';
import { Tag } from '../product/entities/tag';

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./storage/db.sqlite",
    entities: [Product, Tag, Label, Picture],
    synchronize: true
})

export const getConncetion = async (): Promise<DataSource> => {

    if (AppDataSource.isInitialized) {
        return AppDataSource;
    }

    return await AppDataSource.initialize();
}

export const getRepository = async <Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Promise<Repository<Entity>> => {
    const conncetion = await getConncetion();
    return conncetion.getRepository(target);
}

