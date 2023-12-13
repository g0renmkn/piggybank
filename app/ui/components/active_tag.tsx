export default async function ActiveTag({active}: {active: boolean}) {
    return (
      <div className="flex grow-0 items-center justify-center">
        {
            (active && 
                <p className="text-xs rounded-full bg-lime-700 text-lime-300 border-lime-950 px-2 border-2 py-1">ACTIVE</p>
            )
            ||
            (!active && 
                <p className="text-xs rounded-full bg-red-900 text-orange-500 text-orange border-red-950 px-2 border-2 py-1">INACTIVE</p>
            )
        }
      </div>
    );
  }
  