import {API} from '../../backend';

// Create a catogary
export const createCatogary = (userId,token,catogary) => {
    return fetch(`${API}/catogary/create/${userId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            'Content-Type' : "application/json",
            Authorization : `Bearer ${token}`   
    },
    body : JSON.stringify(catogary)
    }).then(response =>{
        response.json();
    })   
    .catch(err => console.log(err));
};

//GetAllCatogaries
export const getAllCategories = () =>{
    return fetch(`${API}/catogeries`,{
        method: 'GET'
    }).then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

// create a product
export const createProduct = (userId,token,product) =>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
            headers:{
                Accept : "application/json",
                Authorization : `Bearer ${token}`
            },
            body : product
    }).then(response =>{
        return  response.json();
    })
    .catch(err => console.log(err));
};

//GET All Product
export const getAllProducts = () =>{
    return fetch(`${API}/products`,{
        method : 'GET'
    })
    .then(response =>{
    return response.json();
     // console.log(response);
    })
    .catch(err=> console.log(err));
};
//delete a product
export const deleteProduct = (productId,userId,token) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
            headers:{
                Accept : "application/json",
                Authorization : `Bearer ${token}`
            }
    }).then(response =>{
      return  response.json();
    })
    .catch(err => console.log(err));
};

//get a Product
export const getProduct = productId  => {
    return fetch(`${API}/product/${productId}`,{
        method : 'GET'
    })
    .then(response =>{
       return response.json();
    })
    .catch(err => console.log(err));
};

//update a product
export const updateProduct = (productId,userId,token,product) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
            headers:{
                Accept : "application/json",
                Authorization : `Bearer ${token}`
            },
            body : product
    }).then(response =>{
        response.json();
    })
    .catch(err => console.log(err));
};