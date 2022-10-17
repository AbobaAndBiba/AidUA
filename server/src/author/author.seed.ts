import { dbInstance } from '../db/db.instance';
import { authorSeedData } from './author.seed.data';

export const authorSeed = async () => {
    console.log('Author seeding start...')
    for(const data of authorSeedData.authors)
        await dbInstance.author.create({data});
};