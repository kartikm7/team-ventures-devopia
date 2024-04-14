"use client"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../sdk/FirebaseSDK";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Import ApexCharts dynamically to prevent SSR errors
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Prediction {
  obtained_marks: number;
  total_marks: number;
  subjects: string;
}

export function ExampleChart() {
  const user = useUser().user;
  const id = user?.id;

  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [allPredictions, setAllPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    async function getSubjects() {
      const q = query(collection(db, "users"), where("uid", "==", `${id}`));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const predictions: Prediction[] = doc.data()?.predictions;
        console.log(doc.data( ));
        // Set all predictions in the state
        setAllPredictions(predictions);
        // Store all predictions in local storage
        localStorage.setItem("predictions", JSON.stringify(predictions));

        // Extract the first 5 subjects and their obtained marks
        const categories = predictions.slice(0, 5).map((prediction) => prediction.subjects.slice(0, 3));
        const data = predictions.slice(0, 5).map((prediction) => prediction.obtained_marks);

        // Set the categories and data in the state
        setCategories(categories);
        setData(data);
      });
    }
    getSubjects();
  }, [id]);

  const option = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: categories,
    },
    colors: ["#00CBB8"],
  };

  const series = [
    {
      name: "series-1",
      data: data,
    },
  ];

  return (
    <>
      {user ? (
        <ApexChart
          type="bar"
          options={option}
          series={series}
          height={200}
          width={400}
        />
      ) : (
        <Skeleton className="mt-2 h-[200px] w-[400px]" />
      )}
    </>
  );
}
