'use server'
/**
 * lib/db/api_summaries.ts
 * 
 * API calls for the Summaries sections
 */
import { unstable_noStore as noStore } from 'next/cache';
import { BASE_URL } from '@/app/lib/db/api_config';

/**
 * 
 * @returns 
 */
export async function banksSummary() {
    noStore();
    let url = BASE_URL + '/sum/banks';

    const res = await fetch(url, {
        next: {
            revalidate: 10
        }
    });
    const resjson = await res.json();

    return resjson;
}