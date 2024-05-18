import {Header} from "../../../components/Header/Header.tsx";
import {CompanyForm} from "../../../modules/CompanyForm/CompanyForm.tsx";

export const CompanyCreate = () => {

    return (
        <>
            <Header title="Créer une entreprise"/>
                <CompanyForm />
        </>
    )
};