"use client";
import { useEffect, useState } from "react";

const useFormattedDate = (isoDateString: string): string => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatDate = (isoDateString: string): string => {
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      const date: Date = new Date(isoDateString);
      return date.toLocaleDateString("en-US", options).replace(/\//g, "-");
    };

    setFormattedDate(formatDate(isoDateString));
  }, [isoDateString]);

  return formattedDate;
};

export default useFormattedDate;
