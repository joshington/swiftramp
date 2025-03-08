'use client'; //mark this as a client component

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: {children:React.ReactNode}) {
    return <SessionProvider>
        {children}
    </SessionProvider>;
}