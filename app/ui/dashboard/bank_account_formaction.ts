"use server";
import Papa from 'papaparse';
import { bankCreateAccs } from '@/app/data/api_banks_accounts';
import { revalidatePath } from 'next/cache';


export type FormState = {
    error?: string | null;
    message?: string |null;
}


export async function handleForm(prevState: FormState, formData: FormData) {

    const fich = formData.get("fileUpload") as File;
    let formRetObj: FormState = {
        error: null,
        message: null
    }

    /* Check if there was an actual file submitted */
    if(fich.size === 0) {
        formRetObj = {
            error: "FRM_BNK_ACC_FILE_MISSING",
            message: "Failed to provide a CSV file"
        }
    }
    else {
        let fileReader = null;
        let text = null;
        let csvString = null;
        let csvObject = null;

        try {
            fileReader = fich.stream().getReader();
            text = await fileReader.read();
            csvString = new TextDecoder().decode(text.value);
            csvObject = Papa.parse(csvString);

            if( csvObject.errors.length>0 ) {
                console.log(csvObject.errors);
                formRetObj = {
                    error: "FRM_BNK_ACC_FILE_PARSE_ERROR",
                    message: "There were errors while parsing CSV file"
                }
            }
            else {
                // Create JSON object out of the CSV array (remove header)
                const parsedCSV = csvObject.data.slice(1).map((row: any) => {
                    return {
                        name: row[1],
                        iban: row[2],
                        closed: row[3],
                        comments: row[4],
                        pfp: row[5]
                    }
                });
    
                // Import CSV
                const ret = await bankCreateAccs(parsedCSV);
    
                if( ret.status === 200 ) {
                    formRetObj = {
                        error: "FRM_BNK_ACC_SUCCESS",
                        message: "CSV file parsed successfully"
                    }
    
                    revalidatePath('/dashboard/banks/accounts');
                }
                else {
                    formRetObj = {
                        error: "FRM_BNK_ACC_DB_IMPORT_ERROR",
                        message: `Error occurred while importing: (${ret.data.err}) - ${ret.data.message}`
                    }
                }
            }
        }
        catch (err) {
            formRetObj = {
                error: "FRM_BNK_ACC_UNEXPECTED_ERROR",
                message: `An unexpected error occurred`
            }
        }
    }

    return formRetObj;
}