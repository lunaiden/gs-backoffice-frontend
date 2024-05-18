import {Header} from "../../../components/Header/Header.tsx";
import {useEffect, useState} from "react";
import api from "../../../utils/api.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ICompany, ILogo} from "../types.tsx";
import {ActionButton} from "../../../components/ActionButton/ActionButton.tsx";

import './CompanyDetails.css'

export const CompanyDetails = () => {
    const [company, setCompany] = useState<ICompany | null>(null);
    const [logo, setLogo] = useState<ILogo | null>(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const fetchCompany = async () => await api.get('/company/' + id, {withCredentials: true})
        .then((res) => {
            setCompany(res.data);

            if(res.data.logo) {
                setLogo(res.data.logo);
            }
        });

    const handleDelete = async () => {
        await api.delete('/company/' + id, {withCredentials: true})
            .then(() => {
                navigate('/superadmin/companies/');
            })
            .catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        fetchCompany();

        return  () => {
            setCompany(null);
            setLogo(null);
        }
    }, []);

    return (
        <>
            <Header title={`Informations de l'entreprise ${company?.name}`} buttonText={'Modifier l\'entreprise'}
                    buttonVariant='primary' buttonAction={() => navigate('/superadmin/companies/edit/' + id)}/>
            <ActionButton buttonVariant={'link go-back'} onClick={() => navigate('/superadmin/companies')}>Revenir à la page Entreprises</ActionButton>
            <div className='company-details-page'>
                <div className='company-name-block'>
                    <div className='company-logo'>
                        <img src={logo ? logo.fileUrl : "https://www.dialog.fr/ged/content/7bab011f-dd85-47fa-89cd-3840a9791031.jpg"}
                             alt="company-logo"/>
                    </div>
                    <div className="company-infos"><h2 className='mb-0'>{company?.name}</h2></div>
                </div>
                <ActionButton buttonVariant='link' onClick={() => handleDelete()}>Supprimer l'entreprise</ActionButton>
                <div className='company-details-illustration-block'>
                    <div className="company-details">
                        <div className='siren-row'>
                            <div className='chip'><strong>SIREN</strong> : {company?.siren ? company?.siren : "Non renseigné"}</div>
                            <div className='chip'><strong>SIRET</strong> : {company?.siret ? company?.siret : "Non renseigné"}</div>
                        </div>
                        <div className="tva-row">
                            <div className='chip'><strong>N° TVA intracommunautaire</strong> : {company?.noTva ? company.noTva : "Non renseigné"}</div>
                        </div>
                        <div className="address-row">
                            <div className='chip'>
                                <strong>Adresse</strong> : {company?.address?.line1}<br/>
                                {company?.address?.line2}{company?.address?.line2 && <br/>}
                                {company?.address?.zipCode}<br/>
                                {company?.address?.city} - {company?.address?.country}
                            </div>
                        </div>
                    </div>
                    <div className="company-illustration"></div>
                </div>
            </div>
        </>
    )
};