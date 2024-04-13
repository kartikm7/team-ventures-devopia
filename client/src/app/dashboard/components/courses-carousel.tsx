import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CourseCarousel() {
  return (
    <div>
      <Carousel>
        <CarouselContent>
        <CarouselItem className="">
            <Card className="">
              <CardHeader>
                <CardTitle>Introduction to Physics</CardTitle>
                <CardDescription>Ncert</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="bg-green-heading">Learn</Button>
              </CardFooter>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className="">
              <CardHeader>
                <CardTitle>Mughal Empire</CardTitle>
                <CardDescription>Ncert</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="bg-green-heading">Learn</Button>
              </CardFooter>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
