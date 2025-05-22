import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("🚀 ~ Home ~ session:", session);

  if (!session) redirect("/login");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
