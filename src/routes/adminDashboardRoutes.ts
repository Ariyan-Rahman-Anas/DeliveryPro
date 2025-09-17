import { LayoutDashboard, Package, Users } from "lucide-react";

export const adminDashboardRoutes = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/dashboard/admin/overview",
      },
    ],
  },
  {
    title: "Users",
    url: "#",
    icon: Users,
    isActive: true,
    items: [
      {
        title: "All users",
        url: "/dashboard/admin/users",
      },
    ],
  },
  {
    title: "Parcels",
    url: "#",
    icon: Package,
    items: [
      {
        title: "Parcels",
        url: "/dashboard/admin/parcels",
      },
    ],
  },
]