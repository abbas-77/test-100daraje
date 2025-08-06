// src/app/auth/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/utils/schema";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "@/styles/auth.module.scss";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await fetch(`https://randomuser.me/api/?results=1&nat=us&phone=${encodeURIComponent(data.phone)}`);
    const json = await res.json();
    const user = json.results[0];

    localStorage.setItem("user", JSON.stringify(user));
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="شماره موبایل"
          type="tel"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Button type="submit">ورود</Button>
      </form>
    </div>
  );
};

export default AuthPage;
