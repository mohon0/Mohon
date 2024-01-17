"use client";

import Loading from "@/components/common/loading/Loading";
import SingleApplication from "@/components/singleApplication/SingleApplication";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SingleApplicationProps {
  application: {
    firstName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    birthDay: string;
    bloodGroup: string;
    mobileNumber: string;
    guardianNumber: string;
    gender: string;
    gpa: string;
    nationality: string;
    nid: string;
    passingYear: string;
    regNumber: string;
    religion: string;
    rollNumber: string;
    image: string;
    fullAddress: string;
    district: string;
    courseName: string;
    duration: string;
    education: string;
    board: string;
    course: string;
    email: string;
    pc: string;
    transactionId: string;
  };
}

export default function Application() {
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<
    SingleApplicationProps["application"] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  const id = params.id;

  useEffect(() => {
    const apiUrl = `/api/singleapplication?id=${id}`;

    setLoading(true);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setApplication(data.application);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching application data:", error);
        setError("Error fetching application data. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading && <Loading />}
      {error && <p>{error}</p>}
      {application && <SingleApplication application={application} />}
    </div>
  );
}
