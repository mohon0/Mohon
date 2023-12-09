"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export default function DurationToggle() {
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `api/duration`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setVisibility(data.button === "On");
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
      const response = await fetch("api/duration", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ button: newData ? "On" : "Off" }),
      });
      if (response.ok) {
        toast.dismiss();
        setVisibility(newData);
        toast.success("Status updated successfully");
        window.location.reload();
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
            id="free"
            checked={visibility}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="free">Free Apply Open</Label>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      )}
    </>
  );
}
