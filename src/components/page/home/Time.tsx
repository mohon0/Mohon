"use client";
import { useEffect, useState } from "react";

export default function DateTime(): JSX.Element {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedDate: string = new Intl.DateTimeFormat(
        "en-US",
        options,
      ).format(date);
      setCurrentDateTime(formattedDate);
    };

    // Update the date and time every second (1000 milliseconds)
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-xl text-muted-foreground md:text-2xl">
      {currentDateTime}
    </div>
  );
}
