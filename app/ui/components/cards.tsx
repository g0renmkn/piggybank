/**
 * app/ui/components/cards.tsx
 * 
 * Card component definitions
 * 
 */

export function Card({
    title,
    value,
    children
  }: {
    title: string;
    value?: number | string;
    children?: React.ReactNode;
  }) {
    // const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-zinc-700 p-2 shadow-sm">
        <div className="flex p-4">
          {/* {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null} */}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <div className={`truncate rounded-xl bg-zinc-600 px-4 py-8 text-center text-2xl`} >
          {children?children:(value?value:"???")}
        </div>
      </div>
    );
  }

