import { Package} from "lucide-react";

export const receiverDashboardRoutes = [
    {
      title: "Parcels",
      url: "#",
      icon: Package,
      items: [
        {
          title: "Create Parcels",
          url: "/dashboard/receiver/parcels/create",
        },
        {
          title: "Parcels",
          url: "/dashboard/receiver/parcels",
        },
        {
          title: "My Parcels",
          url: "/dashboard/receiver/my-parcels",
        },
      ],
    },
  ]