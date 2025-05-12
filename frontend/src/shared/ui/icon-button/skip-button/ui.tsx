import styles from "./styles.module.scss";
import { Button } from "../../button";
import { ButtonProps } from "../../button/types";
import { GreyIcon } from "../../icon/icons";
import clsx from "clsx";

interface SkipButtonProps extends ButtonProps {
  isActive?: boolean;
  onSkip: () => void;
}

export function SkipButton({
  disabled,
  isActive,
  onSkip,
  ...props
}: SkipButtonProps) {
  return (
    <Button
      className={clsx(styles.skipButton, isActive && styles.active)}
      disabled={disabled}
      onClick={isActive ? undefined : onSkip}
      {...props}
    >
      <GreyIcon isStroke={true} name="common/cross" />
    </Button>
  );
}
