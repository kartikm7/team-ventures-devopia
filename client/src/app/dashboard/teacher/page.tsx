import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Welcome from "../components/welcome";
import { ExampleChart } from "../components/marks-chart";
import { Separator } from "@/components/ui/separator";
import CourseCarousel from "../components/courses-carousel";
import FreeTeachers from "../components/available-teachers";

export default function Teacher(){
  return(
    <div className="flex flex-col gap-10 w-full h-screen ">
      <div className="self-center mx-auto ">
        <Welcome />
      </div>
      

  </div>

  )
}