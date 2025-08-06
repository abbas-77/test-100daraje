"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/utils/schema";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "@/styles/auth.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://randomuser.me/api/?results=1&nat=us&phone=${encodeURIComponent(
          data.phone
        )}`
      );
      const json = await res.json();
      const user = json.results[0];

      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err) {
      alert("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>ورود به حساب کاربری</h1>
      <p>لطفاً شماره موبایل خود را وارد کنید</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="شماره موبایل"
          type="tel"
          placeholder="شماره موبایل خود را وارد کنید"
          dir="rtl"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "در حال ورود..." : "ورود"}
        </Button>
      </form>
    </div>
  );
};

export default AuthPage;
