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

const SettingsPage = async () => {
  const session = await auth()

  return (<div>
    {JSON.stringify(session)}
    <form action={async () => {
      "use server";
      await signOut()
    }}>
      <button type="submit">Sign out</button>
    </form>
  </div>);
}

export default SettingsPage;