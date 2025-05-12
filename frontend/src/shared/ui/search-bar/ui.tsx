// TODO: implement.

import styles from "./styles.module.scss";
import { GreyIcon } from "../icon";
import { GreyVr } from "../vr";
import React from "react";
import { SortButton } from "../icon-button/sort-button";

export function SearchBar({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={styles.searchToolbar}>
      <div className={styles.searchBar}>
        <label className={styles.label} htmlFor="input-search">
          <GreyIcon isStroke={true} name="common/search" size="s" />
          <GreyVr isStroke={true} />
        </label>
        <input
          className={styles.input}
          id="input-search"
          onChange={onChange}
          placeholder="Search"
          type="search"
        />
      </div>
      <SortButton />
    </div>
  );
}
