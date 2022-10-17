import { dbInstance } from '../db/db.instance';
import { adminSeedData } from './admin.seed.data';

export const adminSeed = async () => {
    console.log('Admin seeding start...')
    for(const data of adminSeedData.admins)
        await dbInstance.admin.create({data});
};