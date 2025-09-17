/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronsUpDown } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useUserLogoutMutation } from '@/redux/features/auth/authApi';
import { removeUser } from '@/redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from './ui/button';

export function NavUser({
  user,
}: {
  user: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}) {
  const { isMobile } = useSidebar();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLogout, { isLoading }] = useUserLogoutMutation();

  const handleLogout = async () => {
    try {
      const logoutRes = await userLogout(undefined);
      dispatch(removeUser());
      toast.success(logoutRes.data.message);
      navigate('/login');
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                  <span className="text-sm text-gray-500"></span>
                </div>
              ) : (
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                    <span className="text-sm text-gray-500"></span>
                  </div>
                ) : (
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="p-0">
              <Button variant="destructive" className="w-full cursor-pointer">
                {isLoading ? 'Logging out...' : 'Log out'}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
