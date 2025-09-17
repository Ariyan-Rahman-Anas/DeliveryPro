/* eslint-disable @typescript-eslint/no-explicit-any */

import DataTable from '@/components/common/dataTable/DataTable';
import { Button } from '@/components/ui/button';
import { useGetAllUserQuery } from '@/redux/features/auth/authApi';
import {
  useUnblockUserMutation,
  useUpdateUserMutation,
} from '@/redux/features/user/userApi';
import { toast } from 'sonner';

const UsersTable = () => {
  const { data: usersData, isLoading: isUsersLoading } =
    useGetAllUserQuery(undefined);

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();

  const handleUpdateUser = async (id: string, isBlocked: boolean) => {
    try {
      const updateData = { isBlocked };
      const updatedRes = await updateUser({ id, updateData }).unwrap();
      toast.success(updatedRes?.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  const handleUnblockUser = async (id: string) => {
    try {
      const blockedRes = await unblockUser(id).unwrap();
      toast.success(blockedRes?.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { key: 'isActive', header: 'isActive' },
    { key: 'isVerified', header: 'isVerified' },
    { key: 'isDeleted', header: 'isDeleted' },
    { key: 'isBlocked', header: 'isBlocked' },
    {
      key: 'createdAt',
      header: 'Joined',
      render: (user: any) => (
        <div className="">{user?.createdAt.slice(0, 10)}</div>
      ),
    },
    {
      key: 'actions',
      header: 'Action',
      className: 'text-center',
      render: (user: any) => (
        <div>
          {user.isBlocked ? (
            <Button
              disabled={isUnblocking || isUpdating}
              onClick={() => handleUnblockUser(user?._id)}
            >
              Unblock
            </Button>
          ) : (
            <Button
              variant="destructive"
              className=""
              disabled={isUpdating || isUnblocking}
              onClick={() => handleUpdateUser(user?._id, true)}
            >
              Block
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={usersData?.data}
      columns={columns}
      isLoading={isUsersLoading}
      emptyMessage="No users found"
    />
  );
};
export default UsersTable;
