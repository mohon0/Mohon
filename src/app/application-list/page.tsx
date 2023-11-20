"use client";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  firstName: string;
  lastName: string;
  duration: string;
}

export default function List() {
  const [applications, setApplications] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = `/api/apply`;

    setLoading(true);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setApplications(data.application);
        setError(null); // Reset error state on successful fetch
      })
      .catch((error) => {
        console.error("Error fetching application data:", error);
        setError("Error fetching application data. Please try again."); // Set error state
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : applications && applications.length > 0 ? (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              {app.firstName} {app.lastName} - Duration: {app.duration}
            </li>
          ))}
        </ul>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>No application data available.</p>
      )}
    </div>
  );
}
