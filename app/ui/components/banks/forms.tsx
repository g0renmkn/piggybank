'use client';
/**
 * @/app/ui/components/banks/forms.tsx
 * 
 * Form components for the Banks section.
 * 
 */

import { formCreateAccount } from '@/app/lib/formactions/banks';
import { useFormState } from 'react-dom';


/**
 * <AccountsForm />
 * 
 * Account creation form component.
 * 
 * @returns <AccountsForm />
 */
export function AccountsForm() {
  const input_classnames = "block w-full rounded-md border border-zinc-800 py-2 pl-10 text-sm outline-2 placeholder:text-zinc-500 focus:border-lime-500 focus:bg-lime-50 focus:ring-lime-500 bg-zinc-400";

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(formCreateAccount, initialState);

  return (
    <div className="mt-6 text-zinc-900">
      <div className="rounded-md bg-zinc-600 p-4 md:p-6">
        
        <form action={dispatch}>
          {/* Account name */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">Account name: *</label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="<Account name>"
                  className={input_classnames}
                  aria-describedby="name-error"
                />
                {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                ))}
            </div>
          </div>

          {/* Account Iban */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">IBAN: *</label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="iban"
                  name="iban"
                  type="text"
                  placeholder="CCNNNNNNNNNNNNNN..."
                  className={input_classnames}
                  aria-describedby="iban-error"
                />
                {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
            <div id="iban-error" aria-live="polite" aria-atomic="true">
              {state.errors?.iban &&
                state.errors.iban.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                ))}
            </div>
          </div>

          {/* Account closed date */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">Closing Date:</label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="closed"
                  name="closed"
                  type="text"
                  placeholder="YYYY-MM-DDTHH:MM:SS (leave empty if still active)"
                  className={input_classnames}
                  aria-describedby="closed-error"
                />
                {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
            <div id="closed-error" aria-live="polite" aria-atomic="true">
              {state.errors?.closed &&
                state.errors.closed.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Account comments */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">Comments:</label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="comments"
                  name="comments"
                  type="text"
                  placeholder="Comment here..."
                  className={input_classnames}
                  aria-describedby="comments-error"
                />
                {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-6 flex justify-end gap-4">
            <button type="submit">Create Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );
}
  