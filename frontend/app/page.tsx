import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { resolveLocaleFromAcceptLanguage } from "@/lib/home-content";

export default async function Home() {
  const acceptLanguage = (await headers()).get("accept-language");
  const locale = resolveLocaleFromAcceptLanguage(acceptLanguage);

  redirect(`/${locale}`);
}
