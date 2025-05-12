"use client";

import { Coursework } from "@/entities/coursework";
import styles from "./styles.module.scss";
import { SearchBar } from "@/shared/ui/search-bar";
import { useEffect, useRef, useState } from "react";
import { DropDown } from "@/shared/ui/dropdown";
import { CourseworkBase } from "../coursework-base";
import { GreyIcon } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/button";

interface CourseworkSelectProps {
  currentCoursework: Coursework | null;
  courseworks: Coursework[];
  setCurrentCoursework: (coursework: Coursework | null) => void;
}

export function CourseworkSelect({
  currentCoursework,
  courseworks,
  setCurrentCoursework,
}: CourseworkSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  function handleClearSelection() {
    setCurrentCoursework(null);
    setIsOpen(false);
  }
  function handleClickOutside(event: MouseEvent) {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }
  function handleCourseworkClick(coursework: Coursework) {
    setCurrentCoursework(coursework);
    setIsOpen(false);
  }

  useEffect(function () {
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div ref={dropDownRef}>
      <DropDown
        header={
          <div className={styles.header}>
            {currentCoursework?.title ?? "Select coursework (none)"}
          </div>
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <SearchBar />
        <div className={styles.content}>
          <div className={styles.info}>
            <span className={styles.title}>
              <b>My Courseworks</b>
            </span>
            {currentCoursework !== null && (
              <Button
                className={styles.clearButton}
                decor="grey"
                onClick={handleClearSelection}
              >
                <span className={styles.text}>Clear selection (none)</span>
                <GreyIcon isStroke={true} name="common/cross" size="xs" />
              </Button>
            )}
          </div>

          <div className={styles.courseworks}>
            {courseworks.map((coursework) => (
              // CourseworkOption.
              <div
                className={styles.option}
                key={coursework.id}
                onClick={() => handleCourseworkClick(coursework)}
              >
                <CourseworkBase key={coursework.id} {...coursework} />
              </div>
            ))}
          </div>
        </div>
      </DropDown>
    </div>
  );
}
