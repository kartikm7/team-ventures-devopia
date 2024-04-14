"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";

const CarouselItem1 = (props: any) => {
  return (
    <CarouselItem>
      <Card className="">
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          {/* <CardDescription>{desc}</CardDescription> */}
        </CardHeader>
        <CardFooter>
          <a href={`https://www.youtube.com/watch?v=${props.id}`}><Button className="bg-green-heading">Watch</Button></a>
        </CardFooter>
      </Card>
    </CarouselItem>
  );
};

export default function CourseCarousel() {
  const [weak, setWeak] = useState<string>("");
  const [courses, setCourses] = useState<any>();

  useEffect(() => {
    // Retrieve predictions from local storage
    const storedPredictions = localStorage.getItem("predictions");

    async function getCourses() {
      if (storedPredictions) {
        const parsedPredictions = JSON.parse(storedPredictions);
        const weakSubjects = parsedPredictions[parsedPredictions.length - 1].subjects;
        const marks = parsedPredictions[parsedPredictions.length - 1].obtained_marks;

        try {
          const response = await axios.post("http://127.0.0.1:5000/recommendations", {
            performance: {
              [weakSubjects]: marks,
            },
            class: "10",
          });
          
          
          setCourses(response.data.recommended_content);

        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
    }

    getCourses();
  }, []);

  return (
    <>
      {courses ? (
        <Carousel className="w-3/4">
          <CarouselContent>
            {courses.map((course: any, index: number) => (
              <CarouselItem1
                key={index}
                title={course.title}
                img = {course.thumbnail_url}
                id = {course.content_id}
                desc={" "} // Assuming there's a description property in the course object
                button_text="Watch"
              />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </>
  );
}
