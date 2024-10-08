import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  // Obtiene el perfil actual del usuario
  const profile = await currentProfile();

  // Redirige a la página de inicio si no hay perfil
  if (!profile) {
    return redirect("/");
  }

  // Busca el servidor basado en el serverId y verifica si el perfil es miembro
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          id: profile.id,
        },
      },
    },
  });

  // Redirige si el servidor no se encuentra o si el usuario no es miembro
  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar /> {/* Sidebar del servidor */}
      </div>
      <main className="h-full md:pl-60">
        {children} {/* Renderiza los componentes secundarios */}
      </main>
    </div>
  );
};

export default ServerIdLayout;
