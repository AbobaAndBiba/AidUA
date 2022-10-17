import { dbInstance } from '../db/db.instance';
import {addressSeedData} from './address.seed.data';

export const addressSeed = async () => {
    console.log('Address seeding start...')
    for(const data of addressSeedData.addresses)
        await dbInstance.address.create({data});
};