"use client";
import Application from "@/components/application/page";
import Loading from "@/components/common/loading/Loading";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  firstName: string;
  lastName: string;
  duration: string;
  image: string;
  course: string;
  status: string;
}

export default function Apply() {
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState<Post | null>(null);

  useEffect(() => {
    const apiUrl = `/api/application`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((postInfo: Post) => {
        setApplication(postInfo);
      })
      .catch((error) => {
        console.error("Error fetching application data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  console.log(application);

  return (
    <div>
      {isLoading ? (
        // Render a loading indicator or message while fetching data
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : application ? (
        <>
          <div className="flex items-center justify-center flex-col">
            <p className="text-xl font-bold">
              Your application has already been submitted
            </p>

            <div className="bg-gray-900 w-1/4 border rounded-lg mt-16 flex p-3 flex-col gap-2">
              <div className="flex justify-between mb-3">
                <Image
                  src={application.image}
                  alt=""
                  width={200}
                  height={200}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="bg-red-600 px-4 h-10 rounded-md">
                  Delete
                </button>
              </div>
              <p>
                Name: {application.firstName} {application.lastName}
              </p>
              <p>Course: {application.course}</p>
              <p>Type: {application.duration}</p>
              <p>Status: {application.status}</p>
            </div>
          </div>
        </>
      ) : (
        <Application />
      )}
    </div>
  );
}
