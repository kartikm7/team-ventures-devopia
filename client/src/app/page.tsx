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
import { Calendar, Users } from "lucide-react";
import Tilt from "react-parallax-tilt";

type CardProps = {
  className: string;
  title: string;
  description: string;
  icon: any;
}

const CardComponent = (props: CardProps) => {
  return (
    <Card className={props.className}>
      <CardHeader>
        <div className="flex flex-col items-center justify-center w-full text-green-dark">
          {props.icon}
        </div>
        <CardTitle className="w-full text-xl text-center">{props.title}</CardTitle>
        <Separator />
        <Tilt>
          <CardContent className="text-sm text-center">
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

type FeatureProps = {
  image: any;
  title: string;
  desc: string;
  row: boolean;
}

const FeatureComponent = (props: FeatureProps) => {
  return (
    <div className={`flex items-center justify-between gap-20 w-full ${props.row ? "flex-row" : "flex-row-reverse"} max-w-6xl`}>
      <div className="flex items-center justify-center">
        <Image
          src={props.image}
          width={500}
          height={500}
          alt="assessment"
        />
      </div>
      <div className="">
        <h1 className="text-2xl font-semibold">
          {props.title}
        </h1>
        <p>
          {props.desc}
        </p>
      </div>
    </div>
  );
}


export default function Home() {
  const name = "Learn Space";
  return (
    <main className="w-full">
      <div className="flex items-center justify-between w-full h-screen bg-green-dark ">
        <div className="flex flex-col max-w-xl gap-10 mx-auto text-left">
          <p className="text-5xl text-white">
            <span className="font-bold text-blue-heading">Studying online</span> is now,{" "}
            <br /> much better!
          </p>
          <p className="text-lg text-white">TOTC is an interesting platform that will teach you in more an interactive way</p>
          <Button className="w-40" variant={"secondary"}>
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
            icon={<Users size={50} />}
          />
          <CardComponent
            className="w-1/4"
            title="Performance Prediction"
            description="Predictive Analytics"
            icon={<Calendar size={50} />}
          />
          <CardComponent
            className="w-1/4"
            title="Performance Prediction"
            description="Predictive Analytics"
            icon={<Users size={50} />}
          />
        </div>
      </div>
      <div className="flex flex-col w-full gap-5 my-10 text-center">
        <h1 className="text-3xl font-bold"><span className="text-blue-heading">Our</span>{" "}<span className="text-green-dark">Features</span></h1>
        <p className="text-md text-grey">This very extraordinary feature, can make learning activities more efficient</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-10">
        <FeatureComponent
          image={"/images/assessment.png"}
          title="A user interface designed for the classroom"
          desc="Create and grade assessments, quizzes, and exams. <br />
          Easily create and grade assessments, quizzes, and exams."
          row={false}
        />
        <FeatureComponent
          image={"/images/google-meet.png"}
          title="Tools For Teachers And Learners"
          desc="Integrate Google Meet into your classes. <br />
          Easily integrate Google Meet into your classes."
          row={true}
        />
        <FeatureComponent
          image={"/images/assessment.png"}
          title="Assessments, Quizzes, Tests"
          desc="Track attendance and participation. <br />
          Easily track attendance and participation."
          row={false}
        />
        <FeatureComponent
          image={"/images/one-one.png"}
          title="Class Management Tools for Educators"
          desc="Manage grades and assignments. <br />
          Easily manage grades and assignments."
          row={true}
        />
      </div>
    </main>
  );
}
