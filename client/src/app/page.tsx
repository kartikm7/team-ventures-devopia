"use client";
import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Tilt from "react-parallax-tilt";

type CardProps = {
  className: string;
  title: string;
  description: string;
}

const CardComponent = (props: CardProps) => {
  return (
    <Card className={props.className}>
      <CardHeader>
        <CardTitle className="text-xl">{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
        <Separator />
        <Tilt>
          <CardContent className="m-0 text-sm">
            <p>
              Performance Prediction leverages historical reports and pertinent
              metrics to anticipate future outcomes.
            </p>
            <p>
              By analyzing past performance trends and key indicators, our
              system generates insightful forecasts to aid in decision-making.
            </p>
          </CardContent>
        </Tilt>
      </CardHeader>
    </Card>
  );
}



export default function Home() {
  const name = "Learn Space";
  return (
    <main className="w-full">
      <div className="flex items-center justify-between w-full h-screen bg-green-dark ">
        <div className="flex flex-col mx-auto text-5xl text-left md:block">
          <p className="text-white">
            <span className="font-semibold">Studying online</span> is now,{" "}
            <br /> much better!
          </p>
          <Button className="mt-5" variant={"secondary"}>
            Get Started!
          </Button>
        </div>
        <div className="self-end hidden mx-auto md:block">
          <Image
            src={"/images/landing.png"}
            alt="hero image"
            width={600}
            height={600}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-screen gap-20 ">
        <div className="">
          <h1 className="text-3xl font-semibold">
            <span className="text-green-heading">All-In-One</span>{" "}
            <span className="">Education Platform</span>
          </h1>
        </div>
        <div className="flex items-center justify-center w-full gap-20">
          <CardComponent
            className="w-1/4"
            title="Performance Prediction"
            description="Predictive Analytics"
          />
          <CardComponent
            className="w-1/4"
            title="Performance Prediction"
            description="Predictive Analytics"
          />
          <CardComponent
            className="w-1/4"
            title="Performance Prediction"
            description="Predictive Analytics"
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-20 ">
        <div className="flex items-center justify-center w-1/2 mx-auto ">
          <Image
            src={"/images/assessment.png"}
            width={500}
            height={500}
            alt="assessment"
          />
        </div>
        <div className="w-1/2 mx-auto">
          <h1 className="text-2xl font-semibold">
            Assessments,
            <br />
            Quizzes & Tests
          </h1>
          <p>
            Easily launch live assignments, quizzes, and tests. <br />
            Student results are automatically entered in the online gradebook.
          </p>
        </div>
      </div>
      <div className="grid items-center justify-center w-full grid-cols-2 ">
        <div className="w-1/2 mx-auto">
          <h1 className="text-2xl font-semibold">
            One-on-One,
            <br />
            Discussions and tutoring
          </h1>
          <p>
            Easily launch and schedule google meets, <br />
            with faculty who are available.
          </p>
        </div>
        <div className="flex items-center justify-center w-1/2 mx-auto ">
          <Image
            src={"/images/google-meet.png"}
            width={500}
            height={500}
            alt="google meet"
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full h-screen gap-20 bg-gradient-to-t from-green-dark to-white">
        <div className="flex items-center justify-center w-1/2 mx-auto ">
          <Image
            src={"/images/lady.png"}
            width={500}
            height={500}
            alt="assessment"
          />
        </div>
        <div className="w-1/2 mx-auto">
          <h1 className="text-2xl font-semibold">
            Tools for
            <br />
            Teachers & Students
          </h1>
          <p>
            {name} has a dynamic set of teaching tools built to be deployed and <br />
            used during class.
          </p>
        </div>
      </div>
    </main>
  );
}
