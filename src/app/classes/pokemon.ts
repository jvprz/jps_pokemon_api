export interface Pokemon {
    name: string;
    url: string;
    sprites: {
        front_default: string;
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        }
    }[];
    types: {
        slot: number;
        type: {
            name: string;
        }
    }[];
};