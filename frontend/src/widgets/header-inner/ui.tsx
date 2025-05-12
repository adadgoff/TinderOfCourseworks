import { IconName } from "@/shared/ui/icon/types";
import styles from "./styles.module.scss";
import { ButtonDecor } from "@/shared/ui/button/types";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { GreyIcon } from "@/shared/ui/icon";

export function InnerHeader({
  buttonDecor,
  buttonText,
  href,
  iconName,
  openInNewTab = false,
  title,
}: {
  buttonDecor?: ButtonDecor;
  buttonText?: string;
  href?: string;
  iconName?: IconName;
  openInNewTab?: boolean;
  title: string;
}) {
  const showButton = buttonDecor && buttonText && href && iconName;

  // TODO: implement has button checks and throw new InnerHeaderException.

  return (
    <header className={styles.header}>
      <h1>{title}</h1>

      {showButton && (
        <Link href={href} target={openInNewTab ? "_blank" : "_self"}>
          <Button className={styles.button} decor={buttonDecor}>
            <GreyIcon
              isStroke={buttonDecor === "grey"}
              name={iconName}
              size="s"
            />
            {buttonText}
          </Button>
        </Link>
      )}
    </header>
  );
}
