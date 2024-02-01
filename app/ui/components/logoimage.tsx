'use client';
/**
 * logoimate.tsx
 * 
 * Image component that shows a default failsafe image in case the original is not found
 * 
 */
import Image from 'next/image';
import { useState } from 'react';


/**
 * <LogoImage /> 
 * 
 * Component to display a Logo image with a failsafe in case the logo is not found
 * 
 * @param className Additional className prop
 * @param src Original image source
 * 
 * @returns <LogoImage /> Component
 * 
 */
export default function LogoImage(
    {className, src}: 
    {className?: string; src: string}
) {
    const [fsafe, setFailsafe] = useState(src);
    return (
        <Image
            className={className}
            src={fsafe} 
            alt="logo" 
            fill={true}
            onError={(e) => setFailsafe("/notfound.png")}
        />
    );
}