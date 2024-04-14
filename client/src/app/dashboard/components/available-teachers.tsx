"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Bell, Car } from "lucide-react";

type CarouselItemProps = {
  title: string;
  name: string;
  desc: string;
  button_text: string;
  profile_pic: string;
}

const CarouselItem1 = ({ title, desc, button_text, profile_pic, name }: CarouselItemProps) => {
  return (
    <CarouselItem>
      <Card className="">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <div className="">
                <Avatar>
                  <AvatarImage src={profile_pic} />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              </div>
              <h1>{name}</h1>
            </div></CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="bg-green-dark">
            <div className="flex items-center justify-center gap-2">
              <Bell className="" size={20} /> Notify
            </div>
          </Button>
        </CardFooter>
      </Card>
    </CarouselItem>
  );


}

export default function FreeTeachers() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        <CarouselItem className="basis-1/2">
          <Card className="size-52">
            <CardHeader>
              <CardTitle className="text-xl">
                <div className="flex items-center gap-2">
                  <div className="">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                  </div>

                  <h1>Manish Potey</h1>
                </div>
              </CardTitle>
              <CardDescription>Mathematics Faculty</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>
                <div className="flex items-center justify-center gap-2">
                  <Bell size={20} /> Notify
                </div>
              </Button>
            </CardFooter>
          </Card>
        </CarouselItem>
        <CarouselItem className="basis-1/2">
          <Card className="size-52">
            <CardHeader>
              <CardTitle className="text-xl">
                <div className="flex items-center gap-2">
                  <div className="">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                  </div>

                  <h1>Arjun Desai</h1>
                </div>
              </CardTitle>
              <CardDescription>Mathematics Faculty</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>
                <div className="flex items-center justify-center gap-2">
                  <Bell size={20} /> Notify
                </div>
              </Button>
            </CardFooter>
          </Card>
        </CarouselItem>

      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
