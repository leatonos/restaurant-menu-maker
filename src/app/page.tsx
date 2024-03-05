import Image from "next/image";
import styles from "./page.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import ProfileClient from "./components/userInfo";

export default function Home() {
  return (
    <main>
      <h1>Menu creator</h1>
      <ProfileClient/>
      <a href="/api/auth/login">Login</a><br></br>
      <a href="/api/auth/logout">Logout</a>
    </main>
  );
}
