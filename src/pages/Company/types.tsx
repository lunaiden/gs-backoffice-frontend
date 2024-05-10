export interface IAddress {
    id: string;
    line1: string;
    line2: string | null;
    zipCode: string;
    city: string;
    country: string;
}

export interface ICompany {
    id: string;
    name: string;
    siren: string | null;
    siret: string | null;
    noTva: string;
    isAutonomous: boolean;
    address: IAddress;
}