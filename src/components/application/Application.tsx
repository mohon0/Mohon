"use client";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Header from "../application/Header";
import Preview from "../preview/Privew";
import BirthDay from "./BirthDay";
import { BloodGroup } from "./BloodGroup";
import { Board } from "./Board";
import { CourseSelect } from "./CourseSelect";
import { District } from "./District";
import { DurationSelect } from "./DurationSelect";
import { EducationSelect } from "./EducationSelect";
import { FileSelect } from "./FileSelect";
import FooterNotice from "./FooterNotice";
import { Gender } from "./Gender";
import { MaritelSelect } from "./MaritalSelect";
import MyTextInput from "./MyTextInput";
import PayButton from "./PayButton";
import { PcSelect } from "./PcSelect";
import { Religion } from "./Religion";

const Application: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const MAX_IMAGE_SIZE_KB = 500;

  const handleFileSelect = (file: File) => {
    // Check if the file size exceeds the maximum allowed size
    if (file.size > MAX_IMAGE_SIZE_KB * 1024) {
      // Display an error message or handle it as needed
      setImageError(true);
      toast.error(
        `Image size exceeds the maximum limit of ${MAX_IMAGE_SIZE_KB} KB`
      );
    } else {
      setImage(file);
      setImageError(false);
    }
  };

  return (
    <>
      <div className="mb-20">
        <Header />
      </div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          fatherName: "",
          motherName: "",
          birthDay: "",
          bloodGroup: "",
          mobileNumber: "",
          guardianNumber: "",
          gender: "",
          religion: "",
          fullAddress: "",
          district: "",
          email: "",
          pc: "",
          education: "",
          board: "",
          rollNumber: "",
          regNumber: "",
          passingYear: "",
          gpa: "",
          nid: "",
          nationality: "",
          course: "",
          duration: "",
          transactionId: "",
          fatherOccupation: "",
          maritalStatus: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          fatherName: Yup.string()
            .max(30, "Must be 30 characters or less")
            .required("Required"),
          motherName: Yup.string()
            .max(30, "Must be 30 characters or less")
            .required("Required"),
          bloodGroup: Yup.string()
            .max(10, "Must be 10 characters or less")
            .required("Required"),
          birthDay: Yup.date()
            .nullable()
            .required("Required")
            .test(
              "is-over-5",
              "Must be at least 5 years old",
              function (value) {
                // Check if the user is at least 16 years old
                const currentDate = new Date();
                const userBirthDate = new Date(value);
                const userAge =
                  currentDate.getFullYear() - userBirthDate.getFullYear();

                // Adjust age calculation for leap years
                if (
                  currentDate.getMonth() < userBirthDate.getMonth() ||
                  (currentDate.getMonth() === userBirthDate.getMonth() &&
                    currentDate.getDate() < userBirthDate.getDate())
                ) {
                  return userAge - 1 >= 5;
                }

                return userAge >= 5;
              }
            )
            .transform((originalValue, originalObject) => {
              return originalValue instanceof Date ? originalValue : null;
            }),
          mobileNumber: Yup.string()
            .required("Required")
            .matches(/^[0-9]+$/, "Must be a valid phone number"),
          guardianNumber: Yup.string()
            .required("Required")
            .matches(/^[0-9]+$/, "Must be a valid phone number"),
          gender: Yup.string().required("Required"),
          religion: Yup.string().required("Required"),
          fullAddress: Yup.string().required("Required"),
          district: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          pc: Yup.string().required("Required"),
          education: Yup.string().required("Required"),
          board: Yup.string().required("Required"),
          rollNumber: Yup.number().required("Required"),
          regNumber: Yup.number().required("Required"),
          passingYear: Yup.number().required("Required").max(2023).min(1990),
          gpa: Yup.string().required("Required"),
          nid: Yup.number().required("Required"),
          nationality: Yup.string().required("Required"),
          course: Yup.string().required("Required"),
          duration: Yup.string().required("Required"),
          transactionId: Yup.string().required("Required"),
          fatherOccupation: Yup.string().required("Required"),
          maritalStatus: Yup.string().required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setHasError(false);
          setIsSubmitting(true);
          setHasError(true);

          setSubmitting(false);

          const { birthDay, ...otherValues } = values;

          const formattedBirthDay = new Date(birthDay).toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          );

          const formData = new FormData();

          Object.keys(values).forEach((key) => {
            if (key === "birthDay") {
              formData.append(key, formattedBirthDay);
            } else {
              formData.append(key, (values as Record<string, any>)[key]);
            }
          });

          if (image) {
            formData.append("picture", image);
          } else {
            setImageError(true);
          }

          toast.loading("Please wait...");

          const response = await fetch("/api/application", {
            method: "POST",
            body: formData,
            credentials: "include",
          });

          toast.dismiss();
          if (response.ok) {
            toast.success("Your application was successfully submitted");
            const responseData = await response.json();

            router.push(
              `/application-list/singleapplication/${responseData.id}`
            );
          } else {
            toast.error("Couldn't save your post. Please try again later");
          }
        }}
      >
        <Form className="w-11/12 lg:w-3/4 mx-auto flex flex-col gap-6">
          <div className=" lg:absolute top-52 border-primary-200 border right-20">
            {imageError && <span>Image Must Be Provided</span>}
            <FileSelect onFileSelect={handleFileSelect} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <MyTextInput
              label="Student First Name"
              name="firstName"
              type="text"
              placeholder="Md"
            />

            <MyTextInput
              label="Student Last Name"
              name="lastName"
              type="text"
              placeholder="Mohon"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <MyTextInput
              label="Father's Name"
              name="fatherName"
              type="text"
              placeholder="Father name"
            />

            <MyTextInput
              label="Mother's Name"
              name="motherName"
              type="text"
              placeholder="Mother name"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <MyTextInput
              label="Father's Occupation"
              name="fatherOccupation"
              type="text"
              placeholder="Father's Occupation"
            />
            <div>
              <div>Marital Status</div>
              <Field as={MaritelSelect} name="maritalStatus" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <div>
              <div>Date of Birth</div>
              <Field as={BirthDay} name="birthDay" />
            </div>
            <div>
              <div>Blood Group</div>
              <Field as={BloodGroup} name="bloodGroup" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <MyTextInput
              label="Mobile Number"
              name="mobileNumber"
              type="text"
              placeholder="Mobile Number"
            />
            <MyTextInput
              label="Guardian Number"
              name="guardianNumber"
              type="text"
              placeholder="Guardian Number"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <div>
              <div>Gender</div>

              <Field as={Gender} name="gender" />
            </div>
            <div>
              <div>Religion</div>
              <Field as={Religion} name="religion" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <MyTextInput
              label="Full Address"
              name="fullAddress"
              type="text"
              placeholder="Full Address"
            />
            <div>
              <div>District</div>
              <Field as={District} name="District" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Inter your email address"
            />
            <div>
              <div>Do you have computer?</div>
              <Field as={PcSelect} name="pc" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <div>
              <div>Education</div>
              <Field as={EducationSelect} name="education" />
            </div>
            <div>
              <div>Education Board</div>
              <Field
                as={Board}
                name="board"
                onValueChange={(value: any) => {}}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <MyTextInput
              label="Roll Number"
              name="rollNumber"
              type="text"
              placeholder="Roll Number"
            />
            <MyTextInput
              label="Reg. Number"
              name="regNumber"
              type="text"
              placeholder="Registration Number"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <MyTextInput
              label="Passing Year"
              name="passingYear"
              type="text"
              placeholder="Passing Year"
            />
            <MyTextInput
              label="GPA/CGPA"
              name="gpa"
              type="text"
              placeholder="GPA/CGPA"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <MyTextInput
              label="NID/Birth Reg."
              name="nid"
              type="text"
              placeholder="NID/Birth Reg."
            />
            <MyTextInput
              label="Nationality"
              name="nationality"
              type="text"
              placeholder="Nationality"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <div>
              <div>Course</div>
              <Field as={CourseSelect} name="course" />
            </div>
            <div>
              <div>Duration</div>
              <Field as={DurationSelect} name="duration" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-32 gap-6">
            <PayButton />
            <MyTextInput
              label="TransactionID"
              name="transactionId"
              type="text"
              placeholder="Bkash TransactionID"
            />
          </div>
          <FooterNotice />
          <div className="flex items-center md:flex-row justify-center md:gap-20 mt-10 flex-col gap-6">
            <Preview />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-20 flex items-center justify-center py-3 rounded-full text-xl font-bold border border-primary-200 hover:text-primary-200 "
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      </Formik>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Application;
