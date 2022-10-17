import { addressSeedData } from '../address/address.seed.data';
import { aidSeedData } from '../aid/aid.seed.data';
import { citySeedData } from '../city/city.seed.data';
import { coordinatesSeedData } from '../coordinates/coordinates.seed.data';
import { districtSeedData } from '../district/district.seed.data';
import { getMin } from '../functions/get-minimum';
import { regionSeedData } from '../region/region.seed.data';
import { v4 } from 'uuid';
import { Prisma } from '../../prisma/generated/client';

class PickupPointSeedData {
    pickupPoints: Prisma.PickupPointUncheckedCreateInput[] = [];
    constructor(){
        const size = getMin([
            citySeedData.cities.length,
            regionSeedData.regions.length,
            districtSeedData.districts.length,
            addressSeedData.addresses.length,
            coordinatesSeedData.coordinates.length,
            aidSeedData.aids.length
        ]);
        for(let i = 0; i < size; ++i)
            this.pickupPoints.push({
                id: v4(),
                name: 'pickup-point' + i,
                cityId: citySeedData.cities[i].id,
                regionId: regionSeedData.regions[i].id,
                districtId: districtSeedData.districts[i].id,
                addressId: addressSeedData.addresses[i].id,
                coordinatesId: coordinatesSeedData.coordinates[i].id,
                aidId: aidSeedData.aids[i].id
            });
    }
}

export const pickupPointSeedData = new PickupPointSeedData();