"use client";

import { InnerHeader } from "@/widgets/header-inner";
import styles from "./styles.module.scss";
import { LoginForm } from "./widgets";
import { Suspense } from "react";

export function LoginPage() {
  return (
    <main className={styles.main}>
      <InnerHeader title="Tinder of Courseworks" />
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
