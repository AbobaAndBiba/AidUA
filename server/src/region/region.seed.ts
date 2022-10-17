import { dbInstance } from '../db/db.instance';
import { regionSeedData } from './region.seed.data';

export const regionSeed = async () => {
    console.log('Region seeding start...')
    for(const data of regionSeedData.regions)
        await dbInstance.region.create({data});
};