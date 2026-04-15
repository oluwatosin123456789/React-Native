import { Redirect } from "expo-router";

// This just sends you straight to the login screen.
// Think of this like a Next.js redirect() in a page.tsx file.
export default function Index() {
  return <Redirect href="/login" />;
}