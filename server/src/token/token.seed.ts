import { dbInstance } from '../db/db.instance';
import { tokenSeedData } from './token.seed.data';

export const tokenSeed = async () => {
    console.log('Token seeding start...')
    for(const data of tokenSeedData.tokens)
        await dbInstance.token.create({data});
};