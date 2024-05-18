import {Header} from "../../components/Header/Header.tsx";
import api from "../../utils/api.ts";
import {useEffect, useState} from "react";
import {ICompany} from "./types.tsx";
import {Card} from "react-bootstrap";

import './CompanyList.css'
import {ActionButton} from "../../components/ActionButton/ActionButton.tsx";
import {useNavigate} from "react-router-dom";

export const CompanyList = () => {
    const [companies, setCompanies] = useState<ICompany[] | null>(null);

    const navigate = useNavigate();

    const fetchCompanies = () => {
        api.get('/company', {withCredentials: true})
            .then((res) => {
                setCompanies(res.data);
            });
    };

    useEffect(() => {
        fetchCompanies()
    }, []);

    return (
        <>
            <Header title='Entreprises' buttonText='Créer une entreprise' buttonVariant='primary' buttonAction={() => navigate('/superadmin/companies/create')}/>
            <ActionButton buttonVariant={'link go-back'} onClick={() => navigate('/superadmin/dashboard')}>Revenir au tableau de bord</ActionButton>
            <div className='block-company-dashboard'>
                {companies && companies.map((company) => (
                    <Card key={company.id} className='company-card'>
                        <Card.Body>
                            <Card.Title>{company.name}</Card.Title>
                            <Card.Text className='mb-0 mt-3'>
                                {company.address?.line1}
                            </Card.Text>
                            {company.address?.line2 &&
                                <Card.Text>
                                    {company.address.line2}
                                </Card.Text>
                            }
                            <Card.Text>
                                {company.address?.zipCode} {company.address?.city} - {company.address?.country}
                            </Card.Text>
                        </Card.Body>
                            <Card.Footer className="text-center"><ActionButton buttonVariant='link' onClick={() => navigate(`/superadmin/companies/details/${company.id}`)}>Voir les détails</ActionButton></Card.Footer>
                    </Card>
                ))}
            </div>
        </>
    )
};