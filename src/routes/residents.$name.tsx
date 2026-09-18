import { createFileRoute, notFound } from "@tanstack/react-router";
import { ResidentDashboard } from "../components/ResidentDashboard";
import { PWID_PROFILES } from "../data";

export const Route = createFileRoute("/residents/$name")({
  beforeLoad: ({ params }) => {
    if (!PWID_PROFILES.some((p) => p.slug === params.name)) {
      throw notFound();
    }
  },
  component: ResidentPage,
});

function ResidentPage() {
  const { name } = Route.useParams();
  return <ResidentDashboard slug={name} />;
}
