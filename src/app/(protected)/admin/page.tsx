"use client";

import { admin } from "@/actions/admin";
import { FormSuccess } from "@/components/FormSuccess";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from "@prisma/client";

const AdminPage = () => {
  const { toast } = useToast()
  const onServerActionClick = () => {
    admin()
      .then((data) => {
        if (data.error) {
          toast({
            title: 'error title',
            description: 'error',
            variant: 'destructive',
          })
        }

        if (data.success) {
          toast({
            title: 'success title',
            description: 'success',
            variant: 'default',
          })
        }
      })
  }

  const onApiRouteClick = () => {
    fetch("/api/admin")
      .then((response) => {
        if (response.ok) {
          toast({
            title: 'success title',
            description: 'Allowed API Route!',
            variant: 'default',
          })
        } else {
          toast({
            title: 'error title',
            description: 'Forbidden API Route!',
            variant: 'destructive',
          })
        }
      })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🔑 Admin
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess
            message="You are allowed to see this content!"
          />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only API Route
          </p>
          <Button onClick={onApiRouteClick}>
            Click to test
          </Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only Server Action
          </p>
          <Button onClick={onServerActionClick}>
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
