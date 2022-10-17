import { GetPickupPointsFrontDto } from "../dto/get-pickup-points-front.dto";
import { PickupPointLabels } from "../enums/pickup-point.enums";
import { PickupPointFromDB, PickupPointFront } from "../pickup-point.types";

class GetPickupPointsFrontMapper {
    private validateLabel(label: string): boolean {
        switch(label) {
            case PickupPointLabels.City:
            case PickupPointLabels.Region:
            case PickupPointLabels.District:
            case PickupPointLabels.Address:
            case PickupPointLabels.Privileges:
            case PickupPointLabels.Author:
                return true;
            default:
                return false;
        }
    }
    fromFrontToController(filter: GetPickupPointsFrontDto): GetPickupPointsFrontDto{
        return {
            where: filter.where.filter(item => this.validateLabel(item.label))
        }
    }
    fromDBToController(points: PickupPointFromDB[]): PickupPointFront[]{
        return points.map(point => {
            return {
                id: point.id,
                city: point.city.name,
                region: point.region.name,
                district: point.district.name,
                street: point.address.name,
                lat: point.coordinates.x,
                lng: point.coordinates.y,
                registration: point.aid.registration,
                phone: point.aid.phone,
                author: point.aid.author.name,
                privileges: point.aid.privileges.map(privilege => privilege.privilege.name)
            };
        });
    }
}

export const getPickupPointsFrontMapper = new GetPickupPointsFrontMapper();