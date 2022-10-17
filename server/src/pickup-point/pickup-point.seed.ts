import { dbInstance } from '../db/db.instance';
import { pickupPointSeedData } from './pickup-point.seed.data';

export const pickupPointSeed = async () => {
    console.log('Pickup-point seeding start...')
    for(const data of pickupPointSeedData.pickupPoints)
        await dbInstance.pickupPoint.create({data});
};