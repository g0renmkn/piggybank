'use server';
/**
 * api_banks.ts
 * 
 * File that has all the functions for fetching data related to banks using the backend RESTful API.
 * 
 */
import { unstable_noStore as noStore } from 'next/cache';


/**
 * bankGetAccs()
 * 
 * Get the list of bank accounts
 * 
 * @returns 
 */
export async function bankGetAccs() {
    noStore();
    const res = await fetch('http://localhost:4343/api/v1/banks/accounts', {
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
        res = await fetch('http://localhost:4343/api/v1/banks/accounts', {
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
        res = await fetch('http://localhost:4343/api/v1/banks/accounts/'+id, {
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
export async function bankGetMovs({query, page, limit}: {query?: string, page?: string, limit?: string}) {
    noStore();
    let url = 'http://localhost:4343/api/v1/banks/movs';
    let querystr = []
    if (query) {
        querystr.push("query="+query);
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
    const resjson = await res.json();

    return resjson;
}