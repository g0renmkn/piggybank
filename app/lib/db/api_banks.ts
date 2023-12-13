'use server';
/**
 * api_banks.ts
 * 
 * File that has all the functions for fetching data related to banks using the backend RESTful API.
 * 
 */
import { BankAccount } from "./definitions";


/**
 * bankGetAccs()
 * 
 * Get the list of bank accounts
 * 
 * @returns 
 */
export async function bankGetAccs() {
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


export async function bankDeletteAcc(id: number) {
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