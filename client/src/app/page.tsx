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

export default function Home() {
  const name = "Learn Space";
  return (
    <main className="w-full h-screen ">
      <div className="bg-gradient-to-b from-green-dark to-white w-full h-screen flex justify-between items-center ">
        <div className="flex flex-col md:block text-left mx-auto text-5xl">
          <p className="text-white">
            <span className="font-semibold">Studying online</span> is now,{" "}
            <br /> much better!
          </p>
          <Button className="mt-5" variant={"secondary"}>
            Get Started!
          </Button>
        </div>
        <div className="self-end mx-auto hidden md:block">
          <Image
            src={"/images/landing.png"}
            alt="hero image"
            width={600}
            height={600}
          />
        </div>
      </div>
      <div className="w-full h-screen flex flex-col gap-20 justify-center items-center ">
        <div className="">
          <h1 className="text-3xl font-semibold">
            <span className="text-green-heading">All-In-One</span>{" "}
            <span className="">Education Platform</span>
          </h1>
        </div>
        <div className="flex justify-center w-full items-center gap-20">
          <Card className="w-1/4 h-72 border-green-heading">
            <CardHeader>
              <CardTitle className="text-xl">Performance Prediction</CardTitle>
              <CardDescription>
                Based on previous reports and other relevant metrics
              </CardDescription>
              <Separator />
              <Tilt>
                <CardContent className="m-0 text-sm">
                  <p>
                    Performance Prediction leverages historical reports and
                    pertinent metrics to anticipate future outcomes.
                  </p>
                  <p>
                    By analyzing past performance trends and key indicators, our
                    system generates insightful forecasts to aid in
                    decision-making.
                  </p>
                </CardContent>
              </Tilt>
            </CardHeader>
          </Card>
          <Card className="w-1/4 h-72 border-green-heading">
            <CardHeader>
              <CardTitle className="text-xl">Interactive Learning</CardTitle>
              <CardDescription>
                Engaging content for both students and teachers
              </CardDescription>
              <Separator />
              <Tilt>
                <CardContent className="m-0 text-sm">
                  <p>
                    Our platform offers interactive learning experiences
                    tailored for students and teachers alike.
                  </p>
                  <p>
                    Designed with dyslexia-friendly features, such as clear
                    fonts and color contrast, our platform ensures accessibility
                    for all users.
                  </p>
                </CardContent>
              </Tilt>
            </CardHeader>
          </Card>
          <Card className="w-1/4 h-72 border-green-heading">
            <CardHeader>
              <CardTitle className="text-xl">Assessment and Feedback</CardTitle>
              <CardDescription>
                Streamlined evaluation processes for enhanced learning outcomes
              </CardDescription>
              <Separator />
              <Tilt>
                <CardContent className="m-0 text-sm">
                  <p>
                    Our platform simplifies assessment and feedback mechanisms,
                    empowering teachers to provide timely and constructive
                    feedback to students.
                  </p>
                  <p>
                    {name} also provides, customizable assessment tools to
                    automate the redundant processes.
                  </p>
                </CardContent>
              </Tilt>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className=" w-full h-screen flex gap-20 justify-between items-center">
        <div className=" w-1/2 flex justify-center items-center mx-auto">
          <Image
            src={"/images/assessment.png"}
            width={500}
            height={500}
            alt="assessment"
          />
        </div>
        <div className="w-1/2  mx-auto">
          <h1 className="font-semibold text-2xl">
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
      <div className=" w-full h-screen grid grid-cols-2 justify-center items-center">
        <div className="w-1/2  mx-auto">
          <h1 className="font-semibold text-2xl">
            One-on-One,
            <br />
            Discussions and tutoring
          </h1>
          <p>
            Easily launch and schedule google meets, <br />
            with faculty who are available.
          </p>
        </div>
        <div className=" w-1/2 flex justify-center items-center mx-auto">
          <Image
            src={"/images/google-meet.png"}
            width={500}
            height={500}
            alt="google meet"
          />
        </div>
      </div>
      <div className="bg-gradient-to-t from-green-dark to-white w-full h-screen flex gap-20 justify-between items-center">
        <div className=" w-1/2 flex justify-center items-center mx-auto">
          <Image
            src={"/images/lady.png"}
            width={500}
            height={500}
            alt="assessment"
          />
        </div>
        <div className="w-1/2  mx-auto">
          <h1 className="font-semibold text-2xl">
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
