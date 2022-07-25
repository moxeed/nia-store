import 'reflect-metadata'
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { Label } from '../product/entities/label';
import {Picture, Product, Specification} from '../product/entities/product';
import { Option } from '../product/entities/option';
import {FeaturedOption} from "../product/entities/featuredOption";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "94.101.187.218",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    database: "nia_store",
    //synchronize: true,
    //logging: true,
    entities: [Product, Option, Label, Picture, Specification, FeaturedOption],
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

