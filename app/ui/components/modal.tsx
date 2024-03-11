'use client';
import clsx from "clsx";
import { MouseEventHandler, useState } from "react";


export function ModalMessage(
    {title, msg, type, onClick} : 
    {
        title: string | null;
        msg: string | null;
        type: string | null;
        onClick?: MouseEventHandler;
    }
) { 
    const handleCloseClick = (e: any) => {
        e.preventDefault();

        if( onClick ) {
            onClick(e);
        }
    }

    return (
        <div
            className="w-full h-full left-0 top-0 bg-black/90 z-50 flex flex-col absolute"
            onClick={handleCloseClick}
        >
            <div
                className={clsx(
                    "mx-auto my-auto border w-fit flex flex-col rounded-xl px-10 py-10",
                    {
                        "bg-red-900 border-red-300 text-red-300": type === "error",
                        "bg-lime-900 border-lime-300 text-lime-300": type === "success"
                    }
                )}
            >
                <div className="font-bold pb-5">{title}</div>
                <div>{msg}</div>
            </div>
        </div>
    )
}