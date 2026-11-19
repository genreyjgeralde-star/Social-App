import { Redirect } from "expo-router";

// Start on the login screen. Swap this for real auth checks later.
export default function Index() {
  return <Redirect href="/login" />;
}
