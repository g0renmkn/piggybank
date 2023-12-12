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
    const res = await fetch('http://localhost:4343/api/v1/banks/accounts')
    const resjson = await res.json();

    return resjson;
}

export async function bankCreateAcc(obj: any) {
    console.log("Inserting object");
    console.log(obj);
    const res = await fetch('http://localhost:4343/api/v1/banks/accounts', {
        next: {
            revalidate: 0
        },
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj),
    })
    const data = await res.json();

    return data;
}