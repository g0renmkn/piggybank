'use server';
/**
 * api_banks.ts
 * 
 * File that has all the functions for fetching data related to banks using the backend RESTful API.
 * 
 */
import { unstable_noStore as noStore } from 'next/cache';
import { BASE_URL } from '@/app/lib/db/api_config';


/**
 * bankGetAccs()
 * 
 * Get the list of bank accounts
 * 
 * @returns 
 */
export async function bankGetAccs() {
    noStore();
    const res = await fetch(BASE_URL + '/banks/accounts', {
        next: {
            revalidate: 10
        }
    });
    const resjson = await res.json();

    return resjson;
}

/**
 * bankCreateAcc()
 * 
 * Create a new bank account
 * 
 * @param obj 
 * @returns 
 */
export async function bankCreateAcc(obj: any) {
    noStore();
    let res = null;
    let data = null;

    try {
        res = await fetch(BASE_URL + '/banks/accounts', {
            next: {
                revalidate: 0
            },
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        })
        data = await res.json();
    }
    catch (err) {
        console.log(err);
        res = { status: -1}
        if (err instanceof TypeError) {
            data = {
                err: "TypeError",
                message: "Cannot connect to backend to post data."
            }
        }
        else {
            data = {
                err: "Unexpected error",
                message: "An unexpected error occurred."
            }
        }
    }

    return {
        status: res.status,
        data: data
    }
}


/**
 * bankDeleteAcc()
 * 
 * API to delete a bank account
 * 
 * @param id 
 * @returns 
 */
export async function bankDeleteAcc(id: number) {
    noStore();
    let res = null;
    let data = null;

    try {
        res = await fetch(BASE_URL + '/banks/accounts/'+id, {
            next: {
                revalidate: 0
            },
            method: "DELETE",
        })
        data = await res.json();
    }
    catch (err) {
        console.log(err);
        res = { status: -1}
        if (err instanceof TypeError) {
            data = {
                err: "TypeError",
                message: "Cannot connect to backend to post data."
            }
        }
        else {
            data = {
                err: "Unexpected error",
                message: "An unexpected error occurred."
            }
        }
    }

    return {
        status: res.status,
        data: data
    }
}


/**
 * bankGetMovs()
 * 
 * Get the list of bank movements
 * 
 * @returns 
 */
export async function bankGetMovs(
    {query, df, dt, page, limit}: 
    {query?: string, df: string, dt: string, page?: string, limit?: string}
) {
    noStore();
    let url = BASE_URL + '/banks/movs';
    let querystr = [];

    if (query) {
        querystr.push("query="+query);
    }
    if (df) {
        querystr.push("df="+df);
    }
    if (dt) {
        querystr.push("dt="+dt);
    }
    if (page) {
        querystr.push("page="+page);
    }
    if (limit) {
        querystr.push("limit="+limit);
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
 * Get the amount of bank movements
 * 
 * @returns 
 */
export async function bankCountMovs(query: string, df: string, dt: string) {
    noStore();
    let url = BASE_URL + '/banks/movs/count';
    let querystr = [];

    if (query) {
        querystr.push("query="+query);
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
    let ret = 0;

    if( res.status===200 ) { 
        const resjson = await res.json();
        ret = resjson.count;
    }

    return ret;
}