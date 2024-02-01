'use server';
/**
 * api_banks_movs.ts
 * 
 * File that has all the functions for fetching data related to banks using the backend RESTful API.
 * 
 */
import { unstable_noStore as noStore } from 'next/cache';
import { BASE_URL } from '@/app/data/api_config';


/**
 * bankGetMovs()
 * 
 * Retrieve the bank movements object from the database
 * @param query String to search for likeness in the DB fields
 * @param page Page to request
 * @param limit Limit of rows per request
 * @param dir Direction for the orderBy param
 * @param orderby A string representing the field that handles the order
 * @param acc_id An account ID if filtering by account is needed
 * 
 * @returns Movements object from the DB
 */
export async function bankGetMovs(
    {query, page, limit, dir, orderby, acc_id}: 
    {
        query?: string;
        page?: string;
        limit?: string;
        dir?: string;
        orderby?: string;
        acc_id?: string;
    }
) {
    noStore();
    let url = BASE_URL + '/banks/movs';
    let querystr = [];

    if (query) {
        querystr.push("query="+query);
    }
    if (page) {
        querystr.push("page="+page);
    }
    if (limit) {
        querystr.push("limit="+limit);
    }
    if (dir) {
        querystr.push("dir="+dir);
    }
    if (orderby) {
        querystr.push("orderby="+orderby);
    }
    if (acc_id) {
        querystr.push("acc_id="+acc_id);
    }

    if (querystr.length>0) {
        url += "?" + querystr.join("&");
    }

    const res = await fetch(url, {
        next: {
            revalidate: 10
        }
    });

    let ret = [];
    if( res.status === 200 ) {
        ret = await res.json();
    }
    else {
        let err = await res.json();
        
        throw {name: err.err, message: err.message};
    }

    return ret;
}


/**
 * bankCountMovs()
 * 
 * @param query Query object with the params to send to the API for a proper search
 * @param acc_id Account ID if the search needs to be filtered by account
 * 
 * @returns A number representing the number of rows affected
 * 
 */
export async function bankCountMovs(
    {query, acc_id}:
    {query?: string; acc_id?: string}
) {
    noStore();
    let url = BASE_URL + '/banks/movs/count';
    let querystr = [];

    if (query) {
        querystr.push("query="+query);
    }
    if (acc_id) {
        querystr.push("acc_id="+acc_id);
    }

    if (querystr.length>0) {
        url += "?" + querystr.join("&");
    }

    const res = await fetch(url, {
        next: {
            revalidate: 10
        }
    });
    let ret = 0;

    if( res.status===200 ) { 
        const resjson = await res.json();
        ret = resjson.count;
    }

    return ret;
}
