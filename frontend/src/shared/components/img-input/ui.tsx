import { ChangeEvent, useRef } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { Img } from "@/shared/ui/image";
import { ImageSize } from "@/shared/ui/image/types";

interface ImgInputProps {
  imgUrl: string;
  hintText?: string;
  onFileChange?: (file: File) => void;
  size?: ImageSize;
}

export function ImgInput({
  imgUrl,
  hintText,
  onFileChange,
  size = "l",
}: ImgInputProps) {
  const disabled = !onFileChange;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const style = clsx(styles.imgInput, !disabled && styles.editable);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (disabled) return;

    const file = event.target.files?.[0];
    if (!file) return;

    onFileChange(file);
  }

  return (
    <div
      className={style}
      onClick={() => fileInputRef.current?.click()}
      data-hint={hintText}
    >
      <Img className={styles.img} src={imgUrl} size={size} />
      <input
        accept="image/*"
        className={styles.fileInput}
        // disabled={disabled}
        disabled={true}
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
}
