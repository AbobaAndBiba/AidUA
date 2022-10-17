import { v4 } from 'uuid';
import { Prisma } from '../../prisma/generated/client';

class CoordinatesSeedData {
    coordinates: Prisma.CoordinatesUncheckedCreateInput[] = [];
    constructor(){
        for(let i = 0; i < 5; ++i)
            this.coordinates.push({
                id: v4(),
                x: 100 + (i * 100),
                y: 100 + (i * 100),
            });
    }
}

export const coordinatesSeedData = new CoordinatesSeedData();