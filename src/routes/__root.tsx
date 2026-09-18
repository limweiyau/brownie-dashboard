import { createRootRoute, Outlet } from "@tanstack/react-router";
import { BrownieProvider } from "../components/brownie";
import { NavBar } from "../components/NavBar";

const RootLayout = () => (
  <div className="min-h-screen bg-[#eef2f7] text-slate-900">
    <div className="mx-auto max-w-screen-2xl">
      <BrownieProvider>
        <NavBar />
        <Outlet />
      </BrownieProvider>
    </div>
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
