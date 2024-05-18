import {Header} from "../../../components/Header/Header.tsx";
import {CompanyForm} from "../../../modules/CompanyForm/CompanyForm.tsx";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../../utils/api.ts";
import {useEffect, useState} from "react";
import {ICompany} from "../types.tsx";
import {ActionButton} from "../../../components/ActionButton/ActionButton.tsx";

export const CompanyUpdate = () => {
    const [company, setCompany] = useState<ICompany | null>(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const fetchCompany = async () => {
        await api.get('/company/' + id, {withCredentials: true})
            .then((res) => {
                setCompany(res.data);
            }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchCompany();
    }, []);

    return (
        <>
            <Header title={`Modifier ${company?.name}`}/>
            <ActionButton buttonVariant={'link go-back'} onClick={() => navigate('/superadmin/companies/details/' + id)}>Revenir à la page de l'entreprise</ActionButton>
            <CompanyForm id={id} />
        </>
    )
};