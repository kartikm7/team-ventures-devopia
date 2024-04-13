import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="flex justify-center items-center mt-10">
      <Button onClick={() => navigate("/login")}>Go to Login</Button>
      <SignUp />
    </main>
  );
}
