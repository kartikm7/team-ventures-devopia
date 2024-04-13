import { Button } from "@/components/ui/button";
import Welcome from "../components/welcome";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function Teacher() {
  return (
    <div className="flex flex-col justify-center items-center gap-20 w-full h-screen ">
      <div className="flex justify-center items-center gap-20">
        <Welcome />
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Doubt session!</CardTitle>
              <CardDescription>For students who might require so!</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center gap-2 text-sm"><Switch /> Doubt clear mode!</CardFooter>
          </Card>
        </div>
      </div>
      <Table className="w-5/6 mx-auto">
        <TableCaption>A list of your students and their respective papers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead className="text-right">Verify</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>Kartikeya Mishra</TableCell>
            <TableCell className="text-right"><Button>Verify</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">2</TableCell>
            <TableCell>Rahul Dandona</TableCell>
            <TableCell className="text-right"><Button>Verify</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">2</TableCell>
            <TableCell>Rahul Dandona</TableCell>
            <TableCell className="text-right"><Button>Verify</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">2</TableCell>
            <TableCell>Rahul Dandona</TableCell>
            <TableCell className="text-right"><Button>Verify</Button></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
