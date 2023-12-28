'use server'
/**
 * lib/db/api_summaries.ts
 * 
 * API calls for the Summaries sections
 */
import { unstable_noStore as noStore } from 'next/cache';


/**
 * 
 * @returns 
 */
export async function banksSummary() {
    noStore();
    let url = 'http://localhost:4343/api/v1/sum/banks';

    const res = await fetch(url, {
        next: {
            revalidate: 10
        }
    });
    const resjson = await res.json();

    return resjson;
}