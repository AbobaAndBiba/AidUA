import { dbInstance } from '../db/db.instance';
import { coordinatesSeedData } from './coordinates.seed.data';

export const coordinatesSeed = async () => {
    console.log('Coordinates seeding start...')
    for(const data of coordinatesSeedData.coordinates)
        await dbInstance.coordinates.create({data});
};