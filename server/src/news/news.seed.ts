import { dbInstance } from '../db/db.instance';
import { newsSeedData } from './news.seed.data';

export const newsSeed = async () => {
    console.log('News seeding start...')
    for(const data of newsSeedData.news)
        await dbInstance.news.create({data});
};