"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaSearch } from "react-icons/fa";

export default function BloodBank() {
  const [certificate, setCertificate] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const handleFilterChange = (value: string) => setCertificate(value);

  return (
    <div>
      <div className="text-center text-3xl font-bold md:text-5xl">
        Blood Bank
      </div>
      <div className="my-10 flex w-full flex-col  items-center justify-center gap-3 md:gap-2 lg:flex-row lg:gap-10">
        {/* Filter dropdown */}
        <Select onValueChange={handleFilterChange} defaultValue="All">
          <SelectTrigger className="w-60">
            <Label>Filter By Blood Group:</Label>
            <SelectValue placeholder="Select Blood Group:" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Blood Group</SelectLabel>
              {["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (value, idx) => (
                  <SelectItem
                    key={idx}
                    value={value}
                    onSelect={() => handleFilterChange(value)}
                  >
                    {value}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Search input */}
        <div className="relative flex w-full items-center md:w-1/2">
          <Input
            type="text"
            placeholder="Search by applicant name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="absolute right-4 text-xl">
            <FaSearch />
          </div>
        </div>
      </div>
    </div>
  );
}
