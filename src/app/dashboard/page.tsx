"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/dashboard.module.scss"

const DashboardPage = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth");
    }
  }, [router]);

  if (!mounted) return null;

  const user = localStorage.getItem("user");
  const name = user ? JSON.parse(user)?.name?.first : "User";

  return (
    <div className={styles.dashboard}>
      <h1>Welcome to the Dashboard, {name}!</h1>
    </div>
  );
};

export default DashboardPage;
