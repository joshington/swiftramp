// app/dashboard/page.tsx
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import React from 'react';
import Navbar from  "../../components/Navbar"
import Footer from '../../components/Footer';

export default function Dashboard() {
    const { data: session } = useSession();

    if (!session) {
        redirect('/signin');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {session.user?.email}!</p>
        </div>
    );
}