"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { Fredericka_the_Great, Schoolbell } from "next/font/google";
const schoolBell = Schoolbell({ weight: "400", subsets: ["latin"] })

type SmallCardProps = {
  title: string;
  desc: string;
}

const SmallCard = ({ title, desc }: SmallCardProps) => {
  return (
    <div className="w-full text-center">
      <p
        className="text-3xl uppercase"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(19,29,181,1) 30%, rgba(73,187,189,1) 80%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >{title}</p >
      <p className="text-xl whitespace-nowrap">{desc}</p>
    </div>
  )
}

export default function Welcome() {
  const user = useUser().user;
  return (
    <div className="">
      {user ? (
        <div className="flex flex-col gap-20">
          <p className="text-5xl font-bold">
            Welcome, <br />{" "}
            <span> {`${user.fullName}`}</span>
          </p>
          <div className="flex gap-10">
            <SmallCard title="4" desc="Tests Attended" />
            <SmallCard title="73.34%" desc="Average Marks" />
            <SmallCard title="A+" desc="Grade" />
            <SmallCard title="3" desc="Subjects" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-8 w-[300px]" />
        </div>
      )}
    </div>
  );
}
