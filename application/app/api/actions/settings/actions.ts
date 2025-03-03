"use server";

import { cookies } from "next/headers";
import { db } from "@/app/api/db";
import { createClient } from "@/utils/supabase/server";
import { users } from "@/app/api/db/schema";
import { eq } from "drizzle-orm";
import { User } from "@/utils/types";

export async function addUsername(formData: FormData) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const uid = user?.id || "";
    const cookieStore = cookies();
    const username = formData.get("username") as string;
    cookieStore.set("provider_username", username);
    await db
        .update(users)
        .set({ provider_type: "lastfm", provider_username: username })
        .where(eq(users.uid, uid));
}

export async function getData(): Promise<User> {
    const supabase = createClient();
    let data: User = {
        uid: "",
        name: "",
        full_name: "",
        email: "",
        picture: "",
        provider_type: "",
        provider_username: "",
    };
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id || "";
    await db
        .select()
        .from(users)
        .where(eq(users.uid, id))
        .then((a) => {
            data = a[0];
        });
    return data;
}
