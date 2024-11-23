import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UserService from '../Services/UserService'; 

function UserUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        UserService.getUserById(id)
            .then((data) => {
                reset({
                    nom: data.nom || '',
                    prenom: data.prenom || '',
                    email: data.email || '',
                    username: data.username || '',
                    password: data.password || '', 
                    telephone: data.telephone || '',
                    cin: data.cin || '',
                    dateNaissance: data.dateNaissance ? new Date(data.dateNaissance).toISOString().substring(0, 10) : '',
                    dateDebutTravail: data.dateDebutTravail ? new Date(data.dateDebutTravail).toISOString().substring(0, 10) : '',
                    poste: data.poste || '',
                    adresseComplet: data.adresseComplet || '',
                    active: data.active || false,
                });
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id, reset]);

    const onSubmit = (data) => {
        const confirmUpdate = window.confirm("Are you sure you want to edit this user's information?");
        
        if (confirmUpdate) {
            UserService.updateUser(id, data)
                .then(() => {
                    console.log('User updated successfully');
                    navigate(`/`);
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Update User Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Name:
                    <input type="text" {...register("nom", { required: true })} />
                    {errors.nom && <span>This field is required</span>}
                </label>
                <label>
                    First Name:
                    <input type="text" {...register("prenom", { required: true })} />
                    {errors.prenom && <span>This field is required</span>}
                </label>
                <label>
                    Email:
                    <input type="email" {...register("email", { required: true })} />
                    {errors.email && <span>This field is required</span>}
                </label>
                <label>
                    Username:
                    <input type="text" {...register("username", { required: true })} />
                    {errors.username && <span>This field is required</span>}
                </label>
                <label>
                    Password:
                    <input type="password" {...register("password")} placeholder="Leave blank if unchanged" />
                </label>
                <label>
                    Phone:
                    <input type="tel" {...register("telephone", { required: true })} />
                    {errors.telephone && <span>This field is required</span>}
                </label>
                <label>
                    CIN:
                    <input type="text" {...register("cin", { required: true })} />
                    {errors.cin && <span>This field is required</span>}
                </label>
                <label>
                    Date of Birth:
                    <input type="date" {...register("dateNaissance", { required: true })} />
                    {errors.dateNaissance && <span>This field is required</span>}
                </label>
                <label>
                    Start Date:
                    <input type="date" {...register("dateDebutTravail", { required: true })} />
                    {errors.dateDebutTravail && <span>This field is required</span>}
                </label>
                <label>
                    Position:
                    <input type="text" {...register("poste", { required: true })} />
                    {errors.poste && <span>This field is required</span>}
                </label>
                <label>
                    Full Address:
                    <input type="text" {...register("adresseComplet", { required: true })} />
                    {errors.adresseComplet && <span>This field is required</span>}
                </label>
                <label>
                    Active:
                    <input type="checkbox" {...register("active")} />
                </label>

                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UserUpdate; 