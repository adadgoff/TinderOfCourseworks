"use client";

import styles from "./styles.module.scss";
import { ToggleButtonGroup } from "@/shared/ui/toggle-button-group";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useReducer } from "react";
import { Button } from "@/shared/ui/button";
import { GreyHr } from "@/shared/ui/hr";
import { GreyP } from "@/shared/ui/p";
import Link from "next/link";
import { USER_ROLES } from "@/entities/user/consts";
import { UserRole } from "@/entities/user/types";
import { EmailInput } from "@/shared/components/email-input";
import { PasswordInput } from "@/shared/components/password-input";
import { SurnameInput } from "@/shared/components/surname-input";
import { PatronymicInput } from "@/shared/components/patronymic-input";
import { NameInput } from "@/shared/components/name-input";
import { register } from "@/pages_/auth/api/auth";

type State = {
  role: UserRole;
  email: string;
  password: string;
  passwordRepeat: string;
  surname: string;
  name: string;
  patronymic: string;
};

type Action =
  | { type: "SET_ROLE"; payload: UserRole }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_PASSWORD_REPEAT"; payload: string }
  | { type: "SET_SURNAME"; payload: string }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_PATRONYMIC"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_PASSWORD_REPEAT":
      return { ...state, passwordRepeat: action.payload };
    case "SET_SURNAME":
      return { ...state, surname: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_PATRONYMIC":
      return { ...state, patronymic: action.payload };
    default:
      return state;
  }
}

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from");

  const [state, dispatch] = useReducer(reducer, {
    role: (USER_ROLES.includes(fromParam as UserRole)
      ? fromParam
      : UserRole.Student) as UserRole,
    email: "",
    password: "",
    passwordRepeat: "",
    surname: "",
    name: "",
    patronymic: "",
  });

  async function submitRegister(event: FormEvent) {
    event.preventDefault();
    await register({
      role: state.role,
      email: state.email,
      password: state.password,
    });

    router.push(`/login?from=${state.role}`);
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
  function setPasswordRepeat(passwordRepeat: string) {
    dispatch({ type: "SET_PASSWORD_REPEAT", payload: passwordRepeat });
  }
  function setSurname(surname: string) {
    dispatch({ type: "SET_SURNAME", payload: surname });
  }
  function setName(name: string) {
    dispatch({ type: "SET_NAME", payload: name });
  }
  function setPatronymic(patronymic: string) {
    dispatch({ type: "SET_PATRONYMIC", payload: patronymic });
  }

  return (
    <section className={styles.registerForm}>
      <form className={styles.form} onSubmit={submitRegister}>
        <ToggleButtonGroup
          currentOption={state.role}
          options={USER_ROLES as [string, string]}
          setCurrentOption={setRole}
        />
        <EmailInput email={state.email} setEmail={setEmail} />
        <PasswordInput password={state.password} setPassword={setPassword} />
        <PasswordInput
          infoText="Your password again."
          inputName="Password again"
          password={state.passwordRepeat}
          placeholder="password again"
          setPassword={setPasswordRepeat}
        />
        {/* <SurnameInput surname={state.surname} setSurname={setSurname} />
        <NameInput name={state.name} setName={setName} />
        <PatronymicInput
          patronymic={state.patronymic}
          setPatronymic={setPatronymic}
        /> */}

        <Button
          className={styles.submitButton}
          decor="accent"
          disabled={
            state.password === "" || state.password !== state.passwordRepeat
          }
          type="submit"
        >
          create account
        </Button>
      </form>

      <GreyHr />

      <div className={styles.loginRedirect}>
        <GreyP>Have already account?</GreyP>
        <Link href={{ pathname: "/login", query: { from: state.role } }}>
          <Button className={styles.loginButton} decor="grey">
            login
          </Button>
        </Link>
      </div>
    </section>
  );
}
