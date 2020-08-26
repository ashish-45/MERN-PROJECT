import React from 'react';
import Base from '../core/Base';
import {isAuthenticated} from '../auth/helper/index'; 
import { Link } from 'react-router-dom';



const AdminDashBoard = () =>{
    const {
        user : {name,email,role}
    } = isAuthenticated();
  
    const AdminLeftSide = () =>{
        return(
            <div className='card'>
                <h4 className='card-header bg-dark text-white'>Admin Navigation</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link to='/admin/create/catogary' className='nav-link text-success'>
                            Create Catogary
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/catogries' className='nav-link text-success'>
                            Manage Catogary
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/create/product' className='nav-link text-success'>
                            Create Product
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/products' className='nav-link text-success'>
                            Manage Product
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/create/orders' className='nav-link text-success'>
                            Manage Order
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
    const AdminRightSide = () =>{
        return(
            <div className='card mb-4'>
                <h4 className='card-header'>Admin Information</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <span className='badge badge-success mr-2'>Name:</span>{name}
                    </li>
                    <li className='list-group-item'>
                        <span className='badge badge-success mr-2'>Email:</span>{email}
                    </li>
                    <li className='list-group-item'>
                        <span className='badge badge-danger'>Admin Area</span>
                    </li>
                </ul>
            </div>
        )
    }


   
    return(
        <Base title='Welcome to Admin Area' description='Manage all of youe product here' className='container bg-success p-4'>
            <div className='row'>
                <div className='col-3'>{AdminLeftSide()} </div>
                <div className='col-9'> {AdminRightSide()}</div>
            </div>
    </Base>
    )  
}
export default AdminDashBoard;
