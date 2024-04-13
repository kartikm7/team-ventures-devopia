import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselItemProps = {
  title: string;
  desc: string;
  button_text: string;
}

const CarouselItem1 = ({ title, desc, button_text }: CarouselItemProps) => {
  return (
    <CarouselItem>
      <Card className="">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="bg-green-heading">{button_text}</Button>
        </CardFooter>
      </Card>
    </CarouselItem>
  );

}

export default function CourseCarousel() {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem1 title="Math" desc="Ncert" button_text="Learn" />
          <CarouselItem1 title="Science" desc="Ncert" button_text="Learn" />
          <CarouselItem1 title="History" desc="Ncert" button_text="Learn" />
          <CarouselItem1 title="English" desc="Ncert" button_text="Learn" />
          <CarouselItem1 title="Math" desc="Ncert" button_text="Learn" />
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
