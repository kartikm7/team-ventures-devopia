"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type FormFieldName =
  | "school"
  | "specialization"
  | "phoneNumber"
  | `specialization.${number}`;

const formSchema = z.object({
  school: z.string(),
  specialization: z.array(z.string()),
  phoneNumber: z.string(),
});

export default function Login() {
  const router = useRouter();
  const [specializations, setSpecializations] = useState<string[]>([""]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: "",
      specialization: [],
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

    try {
      // Perform login using other credentials (e.g., social login).
      // For this example, it's assumed that the login is handled elsewhere.
      router.push("/dashboard");
      toast(`Welcome!`);
    } catch (error) {
      toast(`Error: ${error}`);
    }
  }

  const addSpecializationField = () => {
    if (specializations.length < 6) {
      setSpecializations([...specializations, ""]);
    }
  };

  const handleSpecializationChange = (index: number, value: string) => {
    const updatedSpecializations = [...specializations];
    updatedSpecializations[index] = value;
    setSpecializations(updatedSpecializations);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="grid grid-cols-2 gap-20">
        <div className="">
          <Image alt="teacher-image" src={'/images/teacher.jpg'} width={500} height={500} />
        </div>
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Fill in the details</CardTitle>
              <CardDescription>Approx 2 minutes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School</FormLabel>
                        <FormControl>
                          <Input placeholder="School" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="h-3/4">
                    {specializations.map((value, index) => (
                      <FormField
                        key={index}
                        control={form.control}
                        name={`specialization_${index}` as FormFieldName}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specialization {index + 1}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter specialization"
                                value={value}
                                onChange={(e) =>
                                  handleSpecializationChange(
                                    index,
                                    e.target.value
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  <Button
                    type="button"
                    size={"sm"}
                    variant={"secondary"}
                    onClick={addSpecializationField}
                    disabled={specializations.length === 6}
                  >
                    Add Specialization
                  </Button>
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
