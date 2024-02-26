export interface Pokemon {
    name: string;
    url: string;
    sprites: {
        front_default: string;
        other: {
          home: {
            front_default: string;
          };
        };
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
            max_stat: number;
            min_stat: number;
            percentage: number;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
        }
    }[];
};
