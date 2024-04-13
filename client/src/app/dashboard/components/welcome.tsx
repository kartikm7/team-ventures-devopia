"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { Fredericka_the_Great, Schoolbell } from "next/font/google";
const schoolBell = Schoolbell({weight: "400", subsets: ["latin"]})

export default function Welcome() {
  const user = useUser().user;
  return (
    <div className="text-5xl font-bold">
      {user ? (
        <p>
          Welcome, <br />{" "}
          <span className={schoolBell.className}> {`${user.fullName}`}</span>
        </p>
      ) : (
        <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[300px]" />
        </div>
      )}
    </div>
  );
}
