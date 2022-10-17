import { dbInstance } from '../db/db.instance';
import { districtSeedData } from './district.seed.data';

export const districtSeed = async () => {
    console.log('District seeding start...')
    for(const data of districtSeedData.districts)
        await dbInstance.district.create({data});
};