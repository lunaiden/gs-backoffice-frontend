export interface IContextProps {
    user: IUser;
    loginUser: (data: IUser) => void; // Define login function to accept any data
    logout: () => void;
}

export interface IUser {
    email: string;
    lastName: string | null;
    firstName: string | null;
    roleName: string;
}