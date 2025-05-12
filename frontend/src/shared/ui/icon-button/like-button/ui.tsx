import styles from "./styles.module.scss";
import { Button } from "../../button";
import { ButtonProps } from "../../button/types";
import { GreyIcon } from "../../icon/icons";
import clsx from "clsx";

interface LikeButtonProps extends ButtonProps {
  isActive?: boolean;
  onLike: () => void;
}

export function LikeButton({
  disabled,
  isActive,
  onLike,
  ...props
}: LikeButtonProps) {
  return (
    <Button
      className={clsx(styles.likeButton, isActive && styles.active)}
      disabled={disabled}
      onClick={isActive ? undefined : onLike}
      {...props}
    >
      <GreyIcon isStroke={true} name="common/like" />
    </Button>
  );
}
