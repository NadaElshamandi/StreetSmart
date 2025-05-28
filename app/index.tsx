import { useAuth } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";

const Home = () => {
  // This component no longer handles redirects based on auth state.
  // The root layout (_layout.tsx) now handles initial routing.
  // This component can remain minimal or be removed if not needed.
  // For now, we'll keep it as a simple entry point.

  return null;
};

export default Home;