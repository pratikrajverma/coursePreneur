import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading('Loading...');
    let result = [];
    try{
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId: categoryId});

        if(!response){
            throw new Error('Could not fetch category page data');
        }

        // console.log('CATALOG PAGE DATA API response...... ' , response)

        result = response?.data;

    }catch(error){
        console.log('CATALOG PAGE DATA API ERROR....', error);
        toast.error(error.message);
        result = error.response?.data;
    }

    toast.dismiss(toastId);
    return result;
}

 