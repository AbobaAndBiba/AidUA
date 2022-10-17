import { dbInstance } from '../db/db.instance';
import { citySeedData } from './city.seed.data';

export const citySeed = async () => {
    console.log('City seeding start...')
    for(const data of citySeedData.cities)
        await dbInstance.city.create({data});
};