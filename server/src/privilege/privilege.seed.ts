import { dbInstance } from '../db/db.instance';
import { privilegeSeedData } from './privilege.seed.data';

export const privilegeSeed = async () => {
    console.log('Privilege seeding start...')
    for(const data of privilegeSeedData.privileges)
        await dbInstance.privilege.create({data});
};