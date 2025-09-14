import { Package, Settings2, Users } from "lucide-react";

export const adminDashboardRoutes = [
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Parcels",
      url: "#",
      icon: Package,
      items: [
        {
          title: "Create Parcels",
          url: "/dashboard/admin/parcels/create",
        },
        {
          title: "Parcels",
          url: "/dashboard/admin/parcels",
        },
        {
          title: "Parcels",
          url: "/dashboard/admin/parcels",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ]