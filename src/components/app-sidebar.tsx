import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "./common/Logo"
import { adminDashboardRoutes } from "@/routes/adminDashboardRoutes"
import { useSelector } from "react-redux"
import { loggedInUser } from "@/redux/features/auth/authSlice"
import { Role } from "@/constants"
import { senderDashboardRoutes } from "@/routes/senderDashboardRoutes"
import { receiverDashboardRoutes } from "@/routes/receiverDashboardRoutes"
import { useNavigate } from "react-router"
import { useEffect } from "react"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate()
  const user = useSelector(loggedInUser)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const userData = {
    name: user?.name,
    email: user?.email,
    avatar: "/avatars/shadcn.jpg",
  }

  return (
    <Sidebar collapsible="icon" {...props} className="bg-gray-900 text-white">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user?.role === Role.ADMIN ? adminDashboardRoutes : user?.role === Role.SENDER ? senderDashboardRoutes : user?.role === Role.RECEIVER ? receiverDashboardRoutes : []} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}