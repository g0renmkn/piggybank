'use server';
/**
 * formactions/banks.ts
 * 
 * File where form actions are defined for Banks section.
 * 
 */
import { bankCreateAcc } from "@/app/lib/db/api_banks";
import { revalidatePath } from 'next/cache';


/**
 * 
 * @param formData Specifies data received by the form
 */
export async function formCreateAccount(formData: FormData) {
    const obj = {
        name: formData.get("accname"),
        iban: "1111-1as1-1111-1111",
        closed: "",
        comments: "No comments"
    }
    
    console.log(formData);
    // const res = await bankCreateAcc(obj);
    // console.log(res);

    revalidatePath("/dashboard/bankaccs");
}
