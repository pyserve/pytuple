import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ Dashboard ~ session:", session);

  if (!session) return redirect("/login");
  return <div>Dashboard</div>;
}
