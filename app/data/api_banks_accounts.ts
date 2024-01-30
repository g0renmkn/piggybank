'use server';
/**
 * api_banks_accounts.ts
 * 
 * File that has all the functions for fetching data related to banks using the backend RESTful API.
 * 
 */
import { unstable_noStore as noStore } from 'next/cache';
import { BASE_URL } from '@/app/data/api_config';


/**
 * bankGetAccs()
 * 
 * Retrieve the accounts object from the database
 * 
 * @returns Accounts object from the DB
 */
export async function bankGetAccs(
    {query, page, limit, dir, orderby}: 
    {
        query?: string;
        page?: string;
        limit?: string;
        dir?: string;
        orderby?: string;
    }
) {
    noStore();
    let url = BASE_URL + '/banks/accounts';
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
 * bankCountAccs()
 * 
 * Get the amount of banks/accounts
 * 
 * @returns An integer representing the row count of the desired query
 */
/**
 * 
 * @param endpoint 
 * @param query
 * @returns 
 */
export async function bankCountAccs(
    {query}:
    {query?: string}
) {
    noStore();
    let url = BASE_URL + '/banks/accounts/count';
    let querystr = [];

    if (query) {
        querystr.push("query="+query);
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

export async function bankSumAccs() {
    noStore();
    let url = BASE_URL + '/sum/banks';

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