import { LayoutDashboard, Package } from "lucide-react";

export const receiverDashboardRoutes = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    items: [
      {
        title: "Overview",
        url: "/dashboard/receiver/overview",
      },
    ],
  },
  {
    title: "Parcels",
    url: "#",
    icon: Package,
    items: [
      {
        title: "My Parcels",
        url: "/dashboard/receiver/my-parcels",
      },
    ],
  },
]