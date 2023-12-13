import { TrashIcon } from "@heroicons/react/24/outline";
import { formDeleteAccount } from "@/app/lib/formactions/banks";

export function DelAccButton({ id }: { id: number }) {
    const deleteAccountWithId = formDeleteAccount.bind(null, id);
  
    return (
      <form action={deleteAccountWithId}>
        <button className="rounded-md border p-2 hover:bg-red-500">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    );
  }