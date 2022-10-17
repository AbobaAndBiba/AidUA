export type PickupPointFront = {
    id: string,
    city: string,
    region: string,
    district: string,
    address: string,
    registration: string,
    phone: string,
    author: string,
    lat: number,
    lng: number,
    privileges: string[]
}

export type PickupPointFromDB = {
    id: string,
    city: {
        name: string
    },
    region: {
        name: string
    },
    district: {
        name: string
    },
    address: {
        name: string
    },
    coordinates: {
        x: number,
        y: number
    },
    aid: {
        registration: string,
        phone: string,
        privileges: Array<{
            privilege: {name: string}
        }>,
        author: {
            name: string
        }
    }
}