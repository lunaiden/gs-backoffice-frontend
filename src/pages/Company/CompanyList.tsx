import {Header} from "../../components/Header/Header.tsx";
import api from "../../utils/api.ts";
import {useEffect, useState} from "react";
import {ICompany} from "./types.tsx";
import {Button, Card} from "react-bootstrap";

import './CompanyList.css'

export const CompanyList = () => {
    const [companies, setCompanies] = useState<ICompany[] | null>(null);

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
            <Header title='Entreprises'/>
            <div className='bloc-company-dashboard'>
                {companies && companies.map((company) => (
                    <Card key={company.id} className='company-card'>
                        <Card.Body>
                            <Card.Title>{company.name}</Card.Title>
                            <Card.Text className='mb-0 mt-3'>
                                {company.address.line1}
                            </Card.Text>
                            {company.address.line2 &&
                                <Card.Text>
                                    {company.address.line2}
                                </Card.Text>
                            }
                            <Card.Text>
                                {company.address.zipCode} {company.address.city} - {company.address.country}
                            </Card.Text>
                        </Card.Body>
                            <Card.Footer className="text-center"><Button variant="link">Voir les détails</Button></Card.Footer>
                    </Card>
                ))}
            </div>
        </>
    )
};