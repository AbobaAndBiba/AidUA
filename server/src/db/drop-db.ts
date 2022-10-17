import { dbInstance } from "./db.instance";

const start = async () => {
    console.log('Dropping start...')
    await dbInstance.pickupPoint.deleteMany();
    await dbInstance.news.deleteMany();
    await dbInstance.coordinates.deleteMany();
    await dbInstance.city.deleteMany();
    await dbInstance.region.deleteMany();
    await dbInstance.district.deleteMany();
    await dbInstance.address.deleteMany();
    await dbInstance.privilegeToAid.deleteMany();
    await dbInstance.privilege.deleteMany();
    await dbInstance.aid.deleteMany();
    await dbInstance.author.deleteMany();
    await dbInstance.admin.deleteMany();
    await dbInstance.token.deleteMany();
};

start();