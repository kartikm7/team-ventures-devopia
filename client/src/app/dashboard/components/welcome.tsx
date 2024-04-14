"use client"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

type Prediction = {
  subjects: string;
  obtained_marks: number;
  total_marks: number;
};

const calculateAverageMarks = (predictions: Prediction[]): number => {
  const totalObtainedMarks = predictions.reduce((total, prediction) => {
    return total + prediction.obtained_marks;
  }, 0);

  const totalSubjects = predictions.length;
  return totalObtainedMarks / totalSubjects;
};

const calculateGrade = (averageMarks: number): string => {
  if (averageMarks >= 90) {
    return "A+";
  } else if (averageMarks >= 80) {
    return "A";
  } else if (averageMarks >= 70) {
    return "B+";
  } else if (averageMarks >= 60) {
    return "B";
  } else if (averageMarks >= 50) {
    return "C";
  } else {
    return "D";
  }
};

const Welcome = () => {
  const [averageMarks, setAverageMarks] = useState<number | null>(null);
  const [grade, setGrade] = useState<string | null>(null);
  const [totalSubjects, setTotalSubjects] = useState<number | null>(null);

  const user = useUser().user;

  useEffect(() => {
    const storedPredictions = localStorage.getItem("predictions");

    if (storedPredictions) {
      const predictions: Prediction[] = JSON.parse(storedPredictions);
      const avgMarks = calculateAverageMarks(predictions);
      const grade = calculateGrade(avgMarks);

      setAverageMarks(avgMarks);
      setGrade(grade);
      setTotalSubjects(predictions.length);
    }
  }, []);

  return (
    <div className="">
      {user ? (
        <div className="flex flex-col gap-20">
          <p className="text-5xl font-bold">
            Welcome, <br />{" "}
            <span> {`${user.fullName}`}</span>
          </p>
          <div className="flex gap-10">
            <SmallCard title={`${averageMarks?.toFixed(2)}%`} desc="Average Marks" />
            <SmallCard title={grade || ""} desc="Grade" />
            <SmallCard title={totalSubjects?.toString() || ""} desc="Subjects" />
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
};

export default Welcome;


const SmallCard = ({ title, desc }: any) => {
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