import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from  './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCatogary from './admin/AddCategory';
import ManageCatogries from './admin/ManageCatogries';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';

const Routes = () => {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'component={Home}></Route>
                    <Route exact path='/signup'component={Signup}></Route>
                    <Route exact path='/signin'component={Signin}></Route>
                    <Route exact path='/cart'component={Cart}></Route>
                    <PrivateRoute path='/user/dashboard' exact component={UserDashBoard}/>
                    <AdminRoute path='/admin/dashboard' exact component={AdminDashBoard}/>
                    <AdminRoute path='/admin/create/catogary' exact component={AddCatogary}/>
                    <AdminRoute path='/admin/catogries' exact component={ManageCatogries}/>
                    <AdminRoute path='/admin/create/product' exact component={AddProduct}/>
                    <AdminRoute path='/admin/products' exact component={ManageProducts}/>
                    <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct}/>

                </Switch>
            </BrowserRouter>
        )
    }
export default Routes;