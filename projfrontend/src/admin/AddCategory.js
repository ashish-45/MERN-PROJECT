import React,{useState} from 'react';
import Base from '../core/Base';
import {isAuthenticated} from '../auth/helper';
import {Link} from 'react-router-dom';
import { createCatogary } from './helper/adminapicall';

const AddCatogary = () =>{
 
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user,token } = isAuthenticated();

    const goBack = () =>{
        return(
            <div className='mt-5'>
            <Link className='btn btn-sm btn-success mb-3' to='/admin/dashboard'>
                Admin Home
            </Link>
        </div>
        )    
    }

    const handleChange = event =>{
        setError('');
        setName(event.target.value);
    };

    const onSubmit = (event) =>{
        event.preventDefault();
        setError('');
        setSuccess(false)

        //Backend request fired
        createCatogary(user._id, token, {name})
        .then(data => {
            console.log(data)
            if(data?.error)  {
                setError(true);
            }else {
                setError('');
                setSuccess(true);
                setName('');
            }
        });
    };

    const successMessage = () => {
        if(success) {
            return <h4 className='text-success'>Catogary Created Successfully.</h4>;
        }
    };

    const warningMessage = () => {
        if(error) {
            return <h4 className='text-success'>Failed to create Catogary.</h4>;
        }
    };

    const myCatogaryForm = () =>(
        <form>
        <div className='form-group'>
             <p className='lead'>Enter the Catogary</p>
             <input type='text' className='form-control my-3' onChange={handleChange} value={name} autoFocus required placeholder='For Ex. Summer' />
             <button onClick={onSubmit} className='btn btn-outline-info'>Create Catogary</button>
        </div>    
    </form>
    );      

    return(
        <Base title='Create a Catogary here' description='Add a new catogary for new Tshirt' className='container bg-info p-4'>
            <div className='row bg-white rounded'>
                <div className='col-md-8 offset-md-2'>
                    {successMessage()}
                    {warningMessage()}
                    {myCatogaryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
};
export default AddCatogary;