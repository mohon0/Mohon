"use client";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Header from "../application/Header";
import Preview from "../preview/Privew";
import { Button } from "../ui/button";
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
import SessionSelect from "./SessionSelect";

const Application: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const MAX_IMAGE_SIZE_KB = 100;

  const handleFileSelect = (file: File) => {
    if (file.size > MAX_IMAGE_SIZE_KB * 1024) {
      setImageError(true);
      toast.error(
        `Image size exceeds the maximum limit of ${MAX_IMAGE_SIZE_KB} KB`,
      );
    } else {
      setImage(file);
      setImageError(false);
    }
  };
  return (
    <>
      <Header />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          session: "",
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
          nationality: "Bangladeshi",
          course: "",
          duration: "",
          transactionId: "",
          fatherOccupation: "",
          maritalStatus: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(40, "Must be 40 characters or less")
            .required("Required"),
          session: Yup.string().required(),
          fatherName: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Required"),
          motherName: Yup.string()
            .max(50, "Must be 50 characters or less")
            .required("Required"),
          bloodGroup: Yup.string()
            .max(10, "Must be 10 characters or less")
            .required("Required"),
          birthDay: Yup.string()
            .required("Required")
            .matches(
              /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
              "Date must be in the format DD/MM/YYYY",
            ),
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
          email: Yup.string().email("Invalid email address"),
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
          setIsSubmitting(true);

          setSubmitting(false);

          const formData = new FormData();

          Object.keys(values).forEach((key) => {
            formData.append(key, (values as Record<string, any>)[key]);
          });

          if (image) {
            formData.append("picture", image);
          } else {
            setImageError(true);
          }

          toast.loading("Please wait...");

          try {
            const response = await axios.post("/api/application", formData, {
              withCredentials: true,
            });

            toast.dismiss();
            if (response.status === 200) {
              toast.success("Your application was successfully submitted");
              const responseData = response.data;

              router.push(
                `/application-list/singleapplication/${responseData.id}`,
              );
            } else {
              toast.error("Couldn't save your post. Please try again later");
            }
          } catch (error) {
            toast.error("Couldn't save your post. Please try again later");
            console.error("Error submitting application:", error);
          }
        }}
      >
        <Form className="mx-auto flex w-11/12 flex-col gap-6 lg:w-3/4">
          <div className=" right-20 top-52 border border-primary lg:absolute">
            {imageError && <span>Image Must Be Provided</span>}
            <FileSelect onFileSelect={handleFileSelect} isRequired={true} />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
            <MyTextInput
              label="Student full Name"
              name="firstName"
              type="text"
              placeholder="Md Mohon"
            />
            <div>
              <div>Session</div>
              <Field as={SessionSelect} name="session" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
            <MyTextInput
              label="Birth Date"
              name="birthDay"
              type="text"
              placeholder="13/01/2000"
            />
            <div>
              <div>Blood Group</div>
              <Field as={BloodGroup} name="bloodGroup" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
            <div>
              <div>Gender</div>

              <Field as={Gender} name="gender" />
            </div>
            <div>
              <div>Religion</div>
              <Field as={Religion} name="religion" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
            <MyTextInput
              label="Email (Optional)"
              name="email"
              type="email"
              placeholder="Inter your email address"
            />
            <div>
              <div>Do you have computer?</div>
              <Field as={PcSelect} name="pc" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
            <div>
              <div>Education</div>
              <Field as={EducationSelect} name="education" />
            </div>
            <div>
              <div>Education Board</div>
              <Field as={Board} name="board" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
            <div>
              <div>Course</div>
              <Field as={CourseSelect} name="course" />
            </div>
            <div>
              <div>Duration</div>
              <Field as={DurationSelect} name="duration" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-32">
            <PayButton />
            <MyTextInput
              label="TransactionID"
              name="transactionId"
              type="text"
              placeholder="Bkash TransactionID"
            />
          </div>
          <FooterNotice />
          <div className="mt-10 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-20">
            <Preview />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-20 py-7"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </Form>
      </Formik>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Application;
