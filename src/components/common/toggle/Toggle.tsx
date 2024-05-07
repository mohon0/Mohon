"use client";
import { FetchActionButtonData } from "@/components/fetch/get/visibility/FetchActionButtonData";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";

export default function Toggle() {
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(true);
  const { refetch } = FetchActionButtonData();

  useEffect(() => {
    const apiUrl = `api/visibility`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setVisibility(data.button === "Apply");
        setLoading(false);
      })
      .catch(() => {
        console.error("Error fetching data");
        setLoading(false);
      });
  }, []);

  const handleSwitchChange = async () => {
    const newData = !visibility;

    try {
      toast.loading("Please wait...");
      const response = await fetch("api/visibility", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ button: newData ? "Apply" : "Contact" }),
      });
      if (response.ok) {
        toast.dismiss();
        setVisibility(newData);
        toast.success("Status updated successfully");
        refetch();
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error("Error updating visibility:", error);
    }
  };

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="flex items-center space-x-2">
          <Switch
            id="apply"
            checked={visibility}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="apply">Apply Open</Label>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
