'use server';
/**
 * api_data_prices.ts
 * 
 * File that has all the functions for fetching asset prices using the backend RESTful API.
 * 
 */
import { unstable_noStore as noStore } from 'next/cache';
import { BASE_URL } from '@/app/data/api_config';


/**
 * dataGetPrices()
 * 
 * Retrieve the available prices object from the database
 * 
 * @returns Prices object from the DB
 */
export async function dataGetPrices(
    {query, page, limit, dir, orderby, asset_id, df, dt}: 
    {
        query?: string;
        page?: string;
        limit?: string;
        dir?: string;
        orderby?: string;
        asset_id?: string;
        df?: string;
        dt?: string;
    }
) {
    noStore();
    let url = BASE_URL + '/prices';
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
    if (asset_id) {
        querystr.push("asset_id="+asset_id);
    }
    if (df) {
        querystr.push("df="+df);
    }
    if (dt) {
        querystr.push("dt="+dt);
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
 * dataCountPrices()
 * 
 * Get the amount of prices rows
 * 
 * @returns An integer representing the row count of the desired query
 */
/**
 * 
 * @param endpoint 
 * @param query
 * @returns 
 */
export async function dataCountPrices(
    {query}:
    {query?: string}
) {
    noStore();
    let url = BASE_URL + '/prices/count';
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
