import {Form} from "react-bootstrap";
import axios from "axios";
import {ChangeEvent, useEffect, useState} from "react";
import {ICompany} from "../../pages/Company/types.tsx";

import './CompanyForm.css'
import {ActionButton} from "../../components/ActionButton/ActionButton.tsx";
import api from "../../utils/api.ts";
import {useNavigate} from "react-router-dom";

interface CompanyFormProps {id?: string | null}

export const CompanyForm = ({id}: CompanyFormProps) => {
    const [helperText, setHelperText] = useState({type: "", message: ""});
    const [company, setCompany] = useState<ICompany | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    let fetchCompany: () => void;
    if (id) {
        fetchCompany = async () => {
            await api.get('/company/' + id, {withCredentials: true})
                .then((res) => {
                    setCompany(res.data);
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        if (id) {
            fetchCompany();
        }
    }, []);

    const handleSubmit = async () => {
        const data = company?.siren ? company?.siren : company?.siret;

        await checkData(String(data))
            .then(async (isValid) => {
                if (isValid) {
                    const formData = new FormData();
                    formData.append('company', JSON.stringify(company));
                    if (file) {
                        formData.append('file', file);
                    }

                    if (id) {
                        // update Company
                        await api.patch('/company/' + id, formData, {withCredentials: true})
                            .then((res) => {
                                navigate('/superadmin/companies/details/' + res.data.id);
                            })
                            .catch((err) => {
                                if (err.response.status === 400) {
                                    setError('Veuillez remplir tous les champs avec une étoile *');
                                }
                            })
                    } else {
                        // create Company
                        await api.post('/company', formData, {withCredentials: true})
                            .then((res) => {
                                navigate('/superadmin/companies/details/' + res.data.id);
                            })
                            .catch((err) => {
                                if (err.response.status === 400) {
                                    setError('Veuillez remplir tous les champs avec une étoile *');
                                }
                            })
                    }
                } else {
                    setError('Numéro SIREN/SIRET invalide');
                    return;
                }
            })
            .catch(() => {
                return;
            });
    };

    async function checkData(value: string) {
        let isValid = false;
        setCompany({
            ...company,
            siren: value
        });
        if (value.length === 9) {
            // check if SIREN exists
            await axios.get('https://api.insee.fr/entreprises/sirene/siren/' + value, {
                headers: {Authorization: `Bearer ${import.meta.env.VITE_SIRENE_TOKEN}`}
            })
                .then(() => {
                    setHelperText({type: 'success', message: 'Numéro SIREN correct !'});
                    isValid = true;
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.status === 404) {
                        setHelperText({type: 'error', message: 'Numéro SIREN introuvable'})
                    } else {
                        setHelperText({
                            type: 'error',
                            message: 'Une erreur est survenue lors de la recherche dans le répertoire Sirene.'
                        })
                    }
                    isValid = false;
                })
        } else if (value.length === 14) {
            // check if SIRET exists
            await axios.get('https://api.insee.fr/entreprises/sirene/siret/' + value, {
                headers: {Authorization: `Bearer ${import.meta.env.VITE_SIRENE_TOKEN}`}
            })
                .then(() => {
                    setHelperText({type: 'success', message: 'Numéro SIRET correct !'})
                    setCompany({
                        ...company,
                        siret: value
                    });
                    isValid = true;
                })
                .catch((err) => {
                    if (err.response.status === 404) {
                        setHelperText({type: 'error', message: 'Numéro SIRET introuvable'})
                    } else {
                        setHelperText({
                            type: 'error',
                            message: 'Une erreur est survenue lors de la recherche dans le répertoire Sirene.'
                        })
                    }
                    isValid = false;
                })
        } else {
            setHelperText({
                type: 'error',
                message: 'Le numéro doit être composé de 9 chiffres (SIREN) ou de 14 chiffres (SIRET)'
            });
            isValid = false;
        }
        return isValid;
    }

    const updateCompany = (property: string, value: string) => {
        if (property === 'name' || property === 'noTva') {
            setCompany({
                ...company,
                [property]: value
            })
        } else {
            setCompany({
                ...company,
                address: {
                    ...company?.address,
                    [property]: value
                }
            })
        }
    };

    return (
        <>
            <div className="create-update-company-page">
                <div className="block-informations flex-block">
                    <h4 className='block-title'>Informations</h4>
                    <div className="form">
                        <Form.Group className="mb-3">
                            <Form.Label>Nom *</Form.Label>
                            <Form.Control type="email" placeholder="Nom de l'entreprise" name='name'
                                          value={company?.name ? company.name : ''}
                                          onChange={(e) => updateCompany(e.target.name, e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>SIREN/SIRET *</Form.Label>
                            <Form.Control type="text" name='siren'
                                          value={company?.siren ? company.siren : company?.siret ? company.siret : ''}
                                          onChange={(e) => checkData(e.target.value)}
                            />
                            {helperText.message !== "" &&
                                <Form.Text id="passwordHelpBlock" muted
                                           className={`${helperText.type === 'error' ? 'error' : 'success'}`}>
                                    {helperText.message}
                                </Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Numéro de TVA intracommunautaire</Form.Label>
                            <Form.Control type="email" placeholder="N° TVA" name='noTva'
                                          value={company?.noTva ? company.noTva : ''}
                                          onChange={(e) => updateCompany(e.target.name, e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Logo de l'entreprise</Form.Label>
                            <Form.Control type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.files) {
                                    setFile(e.target.files[0])
                                }
                            }}/>
                        </Form.Group>
                    </div>
                </div>
                <div className="block-address flex-block">
                    <h4 className='block-title'>Adresse</h4>
                    <div className="form">
                        <Form.Group className="mb-3">
                            <Form.Label>Adresse (ligne 1) *</Form.Label>
                            <Form.Control type="text" name='line1'
                                          value={company?.address?.line1 ? company.address.line1 : ''}
                                          onChange={(e) => updateCompany(e.target.name, e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Adresse (ligne 2)</Form.Label>
                            <Form.Control type="text" name='line2'
                                          value={company?.address?.line2 ? company.address.line2 : ''}
                                          onChange={(e) => updateCompany(e.target.name, e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Code postal *</Form.Label>
                            <Form.Control type="text" name='zipCode'
                                          value={company?.address?.zipCode ? company.address.zipCode : ''}
                                          onChange={(e) => updateCompany(e.target.name, e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ville *</Form.Label>
                            <Form.Control type="text" name='city'
                                          value={company?.address?.city ? company.address.city : ''}
                                          onChange={(e) => updateCompany(e.target.name, e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Pays *</Form.Label>
                            <Form.Control type="text" name='country'
                                          value={company?.address?.country ? company.address.country : ''}
                                          onChange={(e) => updateCompany(e.target.name, e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="block-members flex-block">
                    <h4 className='block-title'>Membres de l'équipe</h4>
                </div>
                {error && <p className='small error'>{error}</p>}
                <ActionButton buttonVariant='primary'
                              onClick={handleSubmit}>{id ? 'Modifier l\'entreprise' : 'Créer l\'entreprise'}</ActionButton>
            </div>
        </>
    )
}