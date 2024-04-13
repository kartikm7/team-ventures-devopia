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
import { Bell } from "lucide-react";

export default function FreeTeachers() {
  return (
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem className="basis-1/2">
            <Card>
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
                  <div className="flex justify-center items-center gap-2">
                    <Bell size={20} /> Notify
                  </div>
                </Button>
              </CardFooter>
            </Card>
          </CarouselItem>
          <CarouselItem className="basis-1/2">
            <Card>
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
                  <div className="flex justify-center items-center gap-2">
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
