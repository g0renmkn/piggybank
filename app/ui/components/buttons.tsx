import { TrashIcon } from "@heroicons/react/24/outline";
import { formDeleteAccount } from "@/app/lib/formactions/banks";
import clsx from 'clsx';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}


export function GenericButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-zinc-800 px-4 text-sm font-medium text-zinc-300 transition-colors hover:bg-lime-100 hover:text-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-lime-300 active:text-lime-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}


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