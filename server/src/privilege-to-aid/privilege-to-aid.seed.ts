import { dbInstance } from '../db/db.instance';
import { privilegeToAidSeedData } from './privilege-to-aid.seed.data';

export const privilegeToAidSeed = async () => {
    console.log('Privilege-to-Aid seeding start...')
    for(const data of privilegeToAidSeedData.privilegeToAids)
        await dbInstance.privilegeToAid.create({data});
};