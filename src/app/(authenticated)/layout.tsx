import Sidebar from "@/components/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AuthenticatedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  return (
    <main className="bg-[#FFF7E9] w-full h-screen flex">
      <Sidebar />
      <div className="absolute top-0 left-[100px] w-[calc(100vw-100px)]">
        {children}
      </div>
    </main>
  );
};

export default AuthenticatedLayout;
