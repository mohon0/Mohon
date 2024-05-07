import { FetchDuration } from "@/components/fetch/get/application/FetchDuration";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";

export default function DurationToggle() {
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(true);
  const { refetch } = FetchDuration();

  useEffect(() => {
    const apiUrl = `api/duration`;

    axios
      .get(apiUrl)
      .then((response) => {
        setVisibility(response.data.button === "On");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const handleSwitchChange = async () => {
    const newData = !visibility;

    try {
      toast.loading("Please wait...");
      const response = await axios.patch(
        "api/duration",
        { button: newData ? "On" : "Off" },
        { withCredentials: true },
      );

      if (response.status === 200) {
        toast.dismiss();
        setVisibility(newData);
        refetch();
        toast.success("Status updated successfully");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error updating status");
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex items-center space-x-2">
          <Switch
            id="free"
            checked={visibility}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="free">Free Apply Open</Label>
          <ToastContainer position="top-center" autoClose={3000} theme="dark" />
        </div>
      )}
    </>
  );
}
