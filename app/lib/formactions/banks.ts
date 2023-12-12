'use server';
/**
 * formactions/banks.ts
 * 
 * File where form actions are defined for Banks section.
 * 
 */
import { bankCreateAcc } from "@/app/lib/db/api_banks";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';


const AccountSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Account name must be specified." ),
    iban: z.string().min(1, "Account IBAN must be specified."),
    closed: z.string().datetime({
        message: "Field must either be null or a date"
    }).optional(),
    comments: z.string()
})

const ParsableAccSchema = AccountSchema.omit({id: true, comments: true});

export type AccState = {
    errors?: {
        name?: string[];
        iban?: string[];
        closed?: string[];
    };
    message?: string | null;
};

/**
 * formCreateAccount()
 * 
 * Action function for Bank account creating form.
 * 
 * @param formData Specifies data received by the form
 */
export async function formCreateAccount(prevState: AccState, formData: FormData) {
    // Create the object to validate fields
    const parsableObj:any = {
        name: formData.get("name"),
        iban: formData.get("iban"),
    }

    // If there is a date value (not null or ""), include it for validation
    const closedStr = formData.get("closed");
    if (closedStr && closedStr.length>0) {
        let kk: string = <string>closedStr;
        if (kk[kk.length-1] === "Z") {
            parsableObj.closed = closedStr;
        }
        else {
            parsableObj.closed = closedStr + "Z";
        }
    }

    const validatedFields = ParsableAccSchema.safeParse(parsableObj);

    console.log(validatedFields.success);
    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields."
        };
    }

    const obj = {
        name: validatedFields.data.name,
        iban: validatedFields.data.iban,
        closed: validatedFields.data.closed,
        comments: formData.get("comments")
    }
    
    const res = await bankCreateAcc(obj);
    console.log(res);

    revalidatePath("/dashboard/bankaccs");
    return {}
}
