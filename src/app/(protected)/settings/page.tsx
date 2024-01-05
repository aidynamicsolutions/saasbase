"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";


import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth, signOut } from "@/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const SettingsPage = () => {
  // const session = await auth()
  const user = useCurrentUser()

  return (<div>
    {JSON.stringify(user)}
    <form>
      <button type="submit">Sign out</button>
    </form>
  </div>);
}

export default SettingsPage;