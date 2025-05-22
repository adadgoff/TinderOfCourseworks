"use client";

import styles from "./styles.module.scss";
import { Button } from "@/shared/ui/button";
import { GreyHr } from "@/shared/ui/hr";
import { GreyP } from "@/shared/ui/p";
import { ToggleButtonGroup } from "@/shared/ui/toggle-button-group";
import Link from "next/link";
import { FormEvent, useReducer } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserRole } from "@/entities/user/types";
import { USER_ROLES } from "@/entities/user/consts";
import { PasswordInput } from "@/shared/components/password-input";
import { EmailInput } from "@/shared/components/email-input";
import { login } from "@/pages_/auth/api/auth";
import Cookies from "js-cookie";

type State = {
  role: UserRole;
  email: string;
  password: string;
};

type Action =
  | { type: "SET_ROLE"; payload: UserRole }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from");

  const [state, dispatch] = useReducer(reducer, {
    role: (USER_ROLES.includes(fromParam as UserRole)
      ? fromParam
      : UserRole.Student) as UserRole,
    email: "",
    password: "",
  });

  async function submitLogin(event: FormEvent) {
    event.preventDefault();
    const response = await login({
      role: state.role,
      email: state.email,
      password: state.password,
    });
    Cookies.set(`${state.role}Token`, response.accessToken);
    router.push(`/${state.role}/courseworks`);
  }

  function setRole(role: string) {
    dispatch({ type: "SET_ROLE", payload: role as UserRole });
  }
  function setEmail(email: string) {
    dispatch({ type: "SET_EMAIL", payload: email });
  }
  function setPassword(password: string) {
    dispatch({ type: "SET_PASSWORD", payload: password });
  }

  return (
    <section className={styles.loginForm}>
      <form className={styles.form} method="POST" onSubmit={submitLogin}>
        <ToggleButtonGroup
          currentOption={state.role}
          options={USER_ROLES as [string, string]}
          setCurrentOption={setRole}
        />
        <EmailInput email={state.email} setEmail={setEmail} />
        <PasswordInput password={state.password} setPassword={setPassword} />

        <Button className={styles.submitButton} decor="accent" type="submit">
          login
        </Button>
      </form>

      <GreyHr />

      <div className={styles.registerRedirect}>
        <GreyP>Do not have an account?</GreyP>
        <Link href={{ pathname: "/register", query: { from: state.role } }}>
          <Button className={styles.registerButton} decor="grey">
            create account
          </Button>
        </Link>
      </div>
    </section>
  );
}
