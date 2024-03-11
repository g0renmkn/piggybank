'use client';
import { FormState, handleForm } from "@/app/ui/dashboard/bank_account_formaction";
import clsx from "clsx";
import { useFormState } from 'react-dom';
import { ModalMessage } from "@/app/ui/components/modal";
import { useEffect, useState } from "react";





export default function BankAccountForm() {
    const initialState = { message: null, errors: null };
    const [state, dispatch] = useFormState(localHandleForm, initialState);
    const [msgVisible, setMsgVisibility] = useState(false);
    const errMsgType = (state.error && state.error === "FRM_BNK_ACC_SUCCESS") ? "success": "error";

    /* Local function wrapper to handle the form */
    async function localHandleForm(prevState: FormState, formData: FormData) {
        let ret = await handleForm(prevState, formData);

        setMsgVisibility(true);
        
        return ret;
    }

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
                msgVisible && 
                <ModalMessage 
                    title={state?.error || null}
                    msg={state?.message || null}
                    type={errMsgType}
                    onClick={() => setMsgVisibility(false)}
                />
            }
        </form>
    )
}
