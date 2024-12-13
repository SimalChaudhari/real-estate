"use client"; // Add this to mark the file as a Client Component

import Wrapper from "./layout-wrapper/wrapper";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHome from "./(dashboard)/dashboard-home/page";
import Login from "./(pages)/login/page";

export default function MainRoot() {
  
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.authenticated); // Check Redux state for auth

  useEffect(() => {
    // Redirect logic to prevent unauthorized access
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  return (
    <Wrapper>
     <DashboardHome />
    </Wrapper>
  );
}
