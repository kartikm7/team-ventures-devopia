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
    // <div className="flex flex-col gap-10 w-full h-screen ">
    //   <div className="grid grid-cols-2 max-h-1/2 justify-center items-center">
    //     <div className="self-center mx-auto ">
    //       <Welcome />
    //     </div>
    //     <div className="self-center mx-auto">
    //       <Card >
    //         <CardHeader>
    //           <CardTitle>Latest Performance</CardTitle>
    //           <CardDescription>
    //             Performance derived from your last result.
    //           </CardDescription>
    //         </CardHeader>
    //         <Separator />
    //         <CardContent>
    //           <ExampleChart />
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-2 max-h-1/2 justify-center items-center">
    //     <div className="flex flex-col mx-auto gap-3">
    //       <h1 className="text-3xl font-semibold">Courses for you</h1>
    //       <CourseCarousel />
    //     </div>
    //     <div className="flex flex-col gap-2 mx-auto">
    //       <h1 className="text-3xl font-semibold">Clear your doubts!</h1>
    //       <FreeTeachers />
    //     </div>
    //   </div>
    // </div>
<div className="grid grid-cols-2 grid-rows-2">
  {/* First subgrid */}
  <div className="grid grid-cols-2 grid-rows-2">
    {/* Row 1 */}
    <div>Subgrid 1, Row 1, Column 1</div>
    <div>Subgrid 1, Row 1, Column 2</div>
    {/* Row 2 */}
    <div>Subgrid 1, Row 2, Column 1</div>
    <div>Subgrid 1, Row 2, Column 2</div>
  </div>

  {/* Second subgrid */}
  <div className="grid grid-cols-2 grid-rows-2">
    {/* Row 1 */}
    <div>Subgrid 2, Row 1, Column 1</div>
    <div>Subgrid 2, Row 1, Column 2</div>
    {/* Row 2 */}
    <div>Subgrid 2, Row 2, Column 1</div>
    <div>Subgrid 2, Row 2, Column 2</div>
  </div>

  {/* Third subgrid */}
  <div className="grid grid-cols-2 grid-rows-2">
    {/* Row 1 */}
    <div>Subgrid 3, Row 1, Column 1</div>
    <div>Subgrid 3, Row 1, Column 2</div>
    {/* Row 2 */}
    <div>Subgrid 3, Row 2, Column 1</div>
    <div>Subgrid 3, Row 2, Column 2</div>
  </div>

  {/* Fourth subgrid */}
  <div className="grid grid-cols-2 grid-rows-2">
    {/* Row 1 */}
    <div>Subgrid 4, Row 1, Column 1</div>
    <div>Subgrid 4, Row 1, Column 2</div>
    {/* Row 2 */}
    <div>Subgrid 4, Row 2, Column 1</div>
    <div>Subgrid 4, Row 2, Column 2</div>
  </div>
</div>

  );
}
