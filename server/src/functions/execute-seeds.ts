import { adminSeed } from '../admin/admin.seed';
import { aidSeed } from '../aid/aid.seed';
import { authorSeed } from '../author/author.seed';
import { citySeed } from '../city/city.seed';
import { coordinatesSeed } from '../coordinates/coordinates.seed';
import { districtSeed } from '../district/district.seed';
import { newsSeed } from '../news/news.seed';
import { pickupPointSeed } from '../pickup-point/pickup-point.seed';
import { privilegeToAidSeed } from '../privilege-to-aid/privilege-to-aid.seed';
import { privilegeSeed } from '../privilege/privilege.seed';
import { regionSeed } from '../region/region.seed';
import { tokenSeed } from '../token/token.seed';
import { addressSeed } from '../address/address.seed'

const start = async () => {
    await citySeed();
    await regionSeed();
    await districtSeed();
    await addressSeed();
    await coordinatesSeed();
    await adminSeed();
    await tokenSeed();
    await authorSeed();
    await privilegeSeed();
    await aidSeed();
    await privilegeToAidSeed();
    await pickupPointSeed();
    await newsSeed();
};

start();