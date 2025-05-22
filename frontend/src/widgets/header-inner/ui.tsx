import { IconName } from "@/shared/ui/icon/types";
import styles from "./styles.module.scss";
import { ButtonDecor } from "@/shared/ui/button/types";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { GreyIcon } from "@/shared/ui/icon";

interface InnerHeaderProps {
  buttonDecor?: ButtonDecor;
  buttonText?: string;
  href?: string;
  iconName?: IconName;
  openInNewTab?: boolean;
  title: string;
}

export function InnerHeader({
  buttonDecor,
  buttonText,
  href,
  iconName,
  openInNewTab = false,
  title,
}: InnerHeaderProps) {
  const showButton = buttonDecor && buttonText && href && iconName;

  // TODO: implement has button checks and throw new InnerHeaderException.

  return (
    <header className={styles.header}>
      <h1>{title}</h1>

      {showButton && (
        <Link href={href} target={openInNewTab ? "_blank" : "_self"}>
          <Button decor={buttonDecor}>
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
