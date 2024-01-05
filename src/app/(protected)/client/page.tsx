"use client"
import { UserInfo } from "@/components/UserInfo";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const ClientPage = () => {
  const user = useCurrentUser()

  return (
    <UserInfo
      label="💻 Server component"
      user={user}
    />
  );
}

export default ClientPage;