"use client";

import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex justify-center items-center mt-10">
      <Link href="/login">
        <Button className="text-blue-background font-text">Login</Button>
      </Link>
    </main>
  );
}
