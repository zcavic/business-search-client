export interface IBusinessData {
    id: string;
    name: string;
    address: string;
}

export interface IBusinessDetailsData {
    id: string;
    name: string;
    address: string;
    website: string;
    phone: string;
    openingHours: IOpeningHours;
}

export interface IOpeningHours {
    days: {
        monday: Array<{ start: string; end: string; type: string }>;
        tuesday: Array<{ start: string; end: string; type: string }>;
        wednesday: Array<{ start: string; end: string; type: string }>;
        thursday: Array<{ start: string; end: string; type: string }>;
        friday: Array<{ start: string; end: string; type: string }>;
        saturday: Array<{ start: string; end: string; type: string }>;
        sunday: Array<{ start: string; end: string; type: string }>;
    };
}
