'use client';
import { handleForm } from "@/app/ui/dashboard/bank_account_formaction";
import clsx from "clsx";
// import { revalidatePath } from "next/cache";
import { useFormState } from 'react-dom';


export default function BankAccountForm() {
    const initialState = { message: null, errors: null };
    const [state, dispatch] = useFormState(handleForm, initialState);


    return (
        <form action={dispatch} className="flex flex-col w-fit">
            <input type="file" name="fileUpload" className="text-primary-brightest mx-auto" />
            <button
                className="bg-background-3 w-fit mx-auto rounded-md px-2 py-2 text-primary-bright border-primary-bright border mt-5 hover:bg-background-4 hover:text-primary-brightest"
                type="submit"
            >
                Submit
            </button>
            {
                state?.error && 
                <div>
                    <h1 className={clsx(
                        {
                            "text-green-700": state.error === "FRM_BNK_ACC_SUCCESS",
                            "text-red-700": state.error !== "FRM_BNK_ACC_SUCCESS"
                        }
                    )}>{state.error}</h1>
                    <p className={clsx(
                        {
                            "text-green-700": state.error === "FRM_BNK_ACC_SUCCESS",
                            "text-red-700": state.error !== "FRM_BNK_ACC_SUCCESS"
                        }
                    )}>{state.message}</p>
                </div>
            }
        </form>
    )
}
