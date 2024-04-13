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

export default function Dashboard() {
  const subjects = ["Math", "Science", "History", "English"];
  const marks = [80, 70, 85, 75];

  return (
    <div className="flex flex-col gap-10 w-full h-screen ">
      <div className="grid grid-cols-2 max-h-1/2 justify-center items-center">
        <div className="self-center mx-auto ">
          <Welcome />
        </div>
        <div className="self-center mx-auto">
          <Card >
            <CardHeader>
              <CardTitle>Latest Performance</CardTitle>
              <CardDescription>
                Performance derived from your last result.
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
              <ExampleChart />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-2 max-h-1/2 justify-center items-center">
        <div className="flex flex-col mx-auto gap-3">
          <h1 className="text-3xl font-semibold">Courses for you</h1>
          <CourseCarousel />
        </div>
        <div className="flex flex-col gap-2 mx-auto">
          <h1 className="text-3xl font-semibold">Clear your doubts!</h1>
          <FreeTeachers />
        </div>
      </div>
    </div>

  );
}
