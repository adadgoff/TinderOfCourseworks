"use client";

import { InnerHeader } from "@/widgets/header-inner";
import styles from "./styles.module.scss";
import { RegisterForm } from "./widgets";
import { Suspense } from "react";

export function RegisterPage() {
  return (
    <main className={styles.main}>
      <InnerHeader title="Tinder of Courseworks" />
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
