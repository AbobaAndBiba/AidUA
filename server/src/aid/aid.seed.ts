import { dbInstance } from '../db/db.instance';
import { aidSeedData } from './aid.seed.data';

export const aidSeed = async () => {
    console.log('Aid seeding start...')
    for(const data of aidSeedData.aids)
        await dbInstance.aid.create({data});
};