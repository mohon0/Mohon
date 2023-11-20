"use client";
import logo from "@/images/hero/logo3.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CourseSelect } from "./CourseSelect";
import DatePicker from "./DatePicker";
import { DurationSelect } from "./DurationSelect";
import { EducationSelect } from "./EducationSelect";
import { FileSelect } from "./FileSelect";
import { PassingYear } from "./PassingYearSelect";
import { SelectDemo } from "./Select";

export default function Application() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [bloodGroups, setBloodGroups] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [guardianNumber, setGuardianNumber] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [education, setEducation] = useState("");
  const [board, setBoard] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [gpa, setGpa] = useState("");
  const [nid, setNid] = useState("");
  const [nationality, setNationality] = useState("");
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handelGenderChange = (value: string) => {
    if (value.trim() !== "") {
      setGender(value);
    } else {
      toast.error("Gender cannot be empty");
      console.error("Gender cannot be empty");
    }
  };
  const handleEducationChange = (value: string) => {
    if (value.trim() !== "") {
      setEducation(value);
    } else {
      toast.error("Education cannot be empty");
      console.error("Education cannot be empty");
    }
  };
  const handleCourseChange = (value: string) => {
    if (value.trim() !== "") {
      setCourse(value);
    } else {
      toast.error("Course cannot be empty");
      console.error("Course cannot be empty");
    }
  };
  const handleDurationChange = (value: string) => {
    if (value.trim() !== "") {
      setDuration(value);
    } else {
      toast.error("Duration cannot be empty");
      console.error("Duration cannot be empty");
    }
  };
  const handlePassingYear = (value: string) => {
    if (value.trim() !== "") {
      setPassingYear(value);
    } else {
      toast.error("Year cannot be empty");
      console.error("Year cannot be empty");
    }
  };
  const handleDay = (value: string) => {
    if (value.trim() !== "") {
      setDay(value);
    } else {
      toast.error("day cannot be empty cannot be empty");
      console.error("day cannot be empty cannot be empty");
    }
  };
  const handleMonth = (value: string) => {
    if (value.trim() !== "") {
      setMonth(value);
    } else {
      toast.error("Month cannot be empty cannot be empty");
      console.error("Month cannot be empty cannot be empty");
    }
  };
  const handleYear = (value: string) => {
    if (value.trim() !== "") {
      setYear(value);
    } else {
      toast.error("Year cannot be empty cannot be empty");
      console.error("Year cannot be empty cannot be empty");
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    // Make sure day, month, and year are valid numbers
    const dayNumber = parseInt(day);
    const monthNumber = parseInt(month);
    const yearNumber = parseInt(year);

    // Check if all values are valid numbers
    if (!isNaN(dayNumber) && !isNaN(monthNumber) && !isNaN(yearNumber)) {
      const birthDay = new Date(yearNumber, monthNumber - 1, dayNumber);
      setDateOfBirth(birthDay.toISOString());
    }
  }, [day, month, year]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("fatherName", fatherName);
      formData.append("motherName", motherName);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("bloodGroups", bloodGroups);
      formData.append("mobileNumber", mobileNumber);
      formData.append("guardianNumber", guardianNumber);
      formData.append("gender", gender);
      formData.append("religion", religion);
      formData.append("fullAddress", fullAddress);
      formData.append("district", district);
      formData.append("education", education);
      formData.append("board", board);
      formData.append("rollNumber", rollNumber);
      formData.append("regNumber", regNumber);
      formData.append("passingYear", passingYear);
      formData.append("gpa", gpa);
      formData.append("nid", nid);
      formData.append("nationality", nationality);
      formData.append("course", course);
      formData.append("duration", duration);
      formData.append("dateOfBirth", dateOfBirth);
      if (selectedFile) {
        formData.append("image", selectedFile);
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
      } else {
        toast.error("Couldn't save your post. Please try again later");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("There was an error");
    }
  };

  return (
    <div className="mx-2 lg:mx-24 my-28">
      <form onSubmit={handleSubmit}>
        <div className="md:grid grid-cols-12">
          <div className="md:col-span-10 text-center flex flex-col gap-6 items-center justify-center">
            <Image
              src={logo}
              alt="logo"
              className="h-16 w-16 md:h-20 md:w-20"
            />
            <div className="text-3xl lg:text-4xl font-bold">
              Best Computer Training Center, Jhenaidah
            </div>
            <div className="border border-primary-200 py-3 px-6 rounded-2xl text-2xl mb-10 md:mb-0 md:text-4xl font-bold">
              Apply Form
            </div>
          </div>
          <div className="col-span-2 border flex items-center justify-center h-48 md:h-32 lg:h-48 flex-col">
            <FileSelect onFileSelect={handleFileSelect} />
          </div>
        </div>
        <div className="md:grid grid-cols-2 gap-10 md:gap-10 lg:gap-40 mt-6">
          <div className="col-span-1 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>Student First Name:</div>
              <input
                type="text"
                required={true}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex md:hidden justify-between items-center">
              <div>Student Last Name:</div>
              <input
                type="text"
                required={true}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Father&#39;s Name:</div>
              <input
                type="text"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                required={true}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex md:hidden justify-between items-center">
              <div>Mother&#39;s Name:</div>
              <input
                type="text"
                required={true}
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Date Of Birth:</div>
              <DatePicker
                onMonthValueChange={handleMonth}
                onYearValueChange={handleYear}
                onDayValueChange={handleDay}
                dayValue={day}
                monthValue={month}
                yearValue={year}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Mobile Number:</div>
              <input
                type="text"
                required={true}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Gender:</div>
              <SelectDemo
                selectedValue={gender}
                onValueChange={handelGenderChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Full Address:</div>
              <input
                type="text"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                required={true}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Education:</div>
              <EducationSelect
                selectedValue={education}
                onValueChange={handleEducationChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Roll Number:</div>
              <input
                type="text"
                required={true}
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Passing Year:</div>
              <PassingYear
                selectedValue={passingYear}
                onValueChange={handlePassingYear}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Birth Reg/NID:</div>
              <input
                type="text"
                required={true}
                value={nid}
                onChange={(e) => setNid(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Course Name:</div>
              <CourseSelect
                onValueChange={handleCourseChange}
                selectedValue={course}
              />
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-6">
            <div className="md:flex hidden justify-between items-center">
              <div>Student Last Name:</div>
              <input
                type="text"
                required={true}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="hidden md:flex justify-between items-center">
              <div>Mother&#39;s Name:</div>
              <input
                type="text"
                required={true}
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Blood Group:</div>
              <input
                type="text"
                required={true}
                value={bloodGroups}
                onChange={(e) => setBloodGroups(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Guardian Number:</div>
              <input
                type="text"
                required={true}
                value={guardianNumber}
                onChange={(e) => setGuardianNumber(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Religion:</div>
              <input
                type="text"
                required={true}
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>District:</div>
              <input
                type="text"
                required={true}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Board:</div>
              <input
                type="text"
                required={true}
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Reg. Number:</div>
              <input
                type="text"
                required={true}
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>GPA/CGPA:</div>
              <input
                type="text"
                required={true}
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Nationality:</div>
              <input
                type="text"
                required={true}
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="bg-slate-700 w-80 h-8 outline-none rounded-lg px-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>Course Durations:</div>
              <DurationSelect
                selectedValue={duration}
                onValueChange={handleDurationChange}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="px-20 flex items-center justify-center mx-auto mt-20 py-3 rounded-full text-xl font-bold border border-primary-200 hover:text-primary-200"
        >
          Submit
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
