"use client";
import { ApplicationListType } from "@/components/type/ApplicationListType";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActionSelect from "./ActionSelect";
import CertificateSelect from "./CertificateSelect";

interface ExtendedApplicationListType extends ApplicationListType {
  refetch: () => void;
}

export default function ApplicationDataCard(app: ExtendedApplicationListType) {
  const [action, setAction] = useState("");
  const [certificate, setCertificate] = useState("");
  async function handleDelete(id: string) {
    try {
      const response = await axios.delete(
        `/api/application/application-list?id=${id}`,
      );
      if (response.status === 200) {
        toast.success("Successfully deleted");
        app.refetch();
      } else {
        toast.error("Error deleting application");
      }
    } catch (error) {
      toast.error("Error deleting application");
    }
  }

  async function UpdateApplication({
    status,
    id,
  }: {
    status: string;
    id: string;
  }) {
    const data = new FormData();
    data.set("status", status);
    if (id) data.set("id", id);

    try {
      toast.loading("Please wait...");
      const response = await axios.put(`/api/application?id=${id}`, data);

      toast.dismiss();
      if (response.status === 200) {
        toast.success("Application Updated successfully");
        app.refetch();
      } else {
        toast.error("Application Updating failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  }

  const handleActionChange = (value: string) => {
    if (!value.trim()) {
      toast.error("Action cannot be empty");
    } else {
      setAction(value);
    }
  };

  function handleCertificateChange(value: string) {
    if (!value.trim()) {
      toast.error("Action cannot be empty");
    } else {
      setCertificate(value);
    }
  }

  function formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  async function UpdateCertificate({
    id,
    status,
  }: {
    id: string;
    status: string;
  }) {
    toast.loading("Please wait...");
    const response = await axios.put("/api/application/application-list", {
      certificate: status,
      id: id,
    });

    toast.dismiss();
    if (response.status === 200) {
      toast.success("Updated certificate successfully");
      app.refetch();
    } else {
      toast.error("Error updating certificate");
    }
  }

  return (
    <div
      key={app.id}
      className="flex w-full flex-col justify-between rounded-lg border p-4"
    >
      <div className="flex justify-between">
        <Link
          href={`/application-list/editapplication/${app.id}`}
          className="h-fit w-fit"
        >
          <Button size="icon" variant="secondary">
            <FaRegEdit size="16" />
          </Button>
        </Link>
        <Image
          src={app.image}
          alt=""
          height={200}
          width={200}
          className="mx-auto mb-4 h-20 w-20 rounded-full"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="destructive">
              <FaRegTrashAlt />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Application</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this Application? This Action
                can not be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={() => {
                    handleDelete(app.id);
                  }}
                  variant="destructive"
                >
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col">
        <p className="mb-2 text-xl font-bold text-primary">
          {app.firstName} {app.lastName}
        </p>
        <p>
          <span className="font-bold text-secondary-foreground">Course: </span>
          {app.course}
        </p>
        <p>
          <span className="font-bold text-secondary-foreground">Type: </span>
          {app.duration}
        </p>
        <p>
          <span className="font-bold text-secondary-foreground">Date: </span>
          {formatDate(app.createdAt)}
        </p>
        <p>
          <span className="font-bold text-secondary-foreground">Status: </span>
          <span
            className={
              app.status === "Approved"
                ? "font-bold text-primary"
                : app.status === "Pending"
                  ? "font-bold text-yellow-500"
                  : app.status === "Rejected"
                    ? "font-bold text-destructive"
                    : ""
            }
          >
            {app.status}
          </span>
        </p>
        <p>
          <span className="font-bold text-secondary-foreground">
            Certificate:{" "}
          </span>
          <span
            className={
              app.certificate === "At Office"
                ? "font-bold text-cyan-500"
                : app.certificate === "Pending"
                  ? "font-bold text-yellow-500"
                  : app.certificate === "Fail"
                    ? "font-bold text-destructive"
                    : app.certificate === "Received"
                      ? "font-bold text-primary"
                      : ""
            }
          >
            {app.certificate}
          </span>
        </p>
        <div className="mt-3 flex items-center gap-0.5">
          <p className="text-sm font-bold">Status:</p>
          <ActionSelect Value={app.status} onValueChange={handleActionChange} />

          <Button
            size="sm"
            variant="secondary"
            onClick={() => UpdateApplication({ status: action, id: app.id })}
          >
            OK
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-0.5">
          <p className="text-sm font-bold">Certificate:</p>
          <CertificateSelect
            Value={app.certificate}
            onValueChange={handleCertificateChange}
          />

          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              UpdateCertificate({
                status: certificate,
                id: app.id,
              })
            }
          >
            OK
          </Button>
        </div>
      </div>
      <Link
        href={`/application-list/singleapplication/${app.id}`}
        className="mt-6 flex w-full"
      >
        <Button variant="secondary" className="w-full">
          View Details
        </Button>
      </Link>
    </div>
  );
}
