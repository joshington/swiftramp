// app/profile/page.tsx
'use client';
import { useSession, signOut } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return <p>You are not signed in.</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}