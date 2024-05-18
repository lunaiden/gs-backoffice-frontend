export interface IAddress {
    id?: string;
    line1?: string;
    line2?: string | null;
    zipCode?: string;
    city?: string;
    country?: string;
}

export interface ICompany {
    id?: string;
    name?: string;
    siren?: string;
    siret?: string;
    noTva?: string;
    isAutonomous?: boolean;
    address?: IAddress;
    logo?: ILogo;
}

export interface ILogo {
    fileName: string;
    fileUrl: string;
    originalFileName: string;
}