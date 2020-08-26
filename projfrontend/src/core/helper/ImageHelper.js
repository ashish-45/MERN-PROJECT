import React from 'react';
import { API } from '../../backend';
const ImageHelper = ({product}) =>{
    const imageurl = product ? `${API}/product/photo/${product._id}`
     : `https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    return(
        <div className="rounded border border-success p-2">
        <img
          src={imageurl}
          alt="photo"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          className="mb-3 rounded"
        />
      </div>
    )
}
export default ImageHelper;
