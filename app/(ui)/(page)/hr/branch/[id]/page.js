"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  UpdateBranch,
  FetchBranchById,
} from "@/app/functions/hr/branch/branch";
import { useSession } from "next-auth/react";
import BranchForm from "@/app/components/hr/branch/BranchForm";

export default function BranchUpdate({ params }) {
  const { data: session } = useSession();
  const branch_id = params.id;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [branch_name, setBranch_name] = useState("");
  const [branch_status, setBranch_status] = useState("");

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const data = await FetchBranchById(branch_id);
        if (data.message) {
          toast.error(data.message);
        } else {
          setBranch_name(data.branch_name || "");
          setBranch_status(data.branch_status?.toString() || "");
        }
      } catch (error) {
        toast.error("Error fetching branch data");
      }
    };

    fetchBranch();
  }, [branch_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("branch_name", branch_name);
    formData.append("branch_status", branch_status);
    formData.append("branch_update_by", session?.user?.user_id);

    try {
      const response = await UpdateBranch({
        formData,
        branch_id,
      });

      if (response.status === 200) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/branch");
        }, 2000);
      } else {
        setError(response);
        toast.error(response.message);
      }
    } catch (error) {
      setError({ message: "Error updating branch: " + error.message });
      toast.error("Error updating branch: " + error.message);
    }
  };

  return (
    <BranchForm
      branch_name={branch_name}
      setBranch_name={setBranch_name}
      branch_status={branch_status}
      setBranch_status={setBranch_status}
      error={error}
      onSubmit={handleSubmit}
      sessionUserName={`${session?.user?.user_firstname} ${session?.user?.user_lastname}`}
      isUpdate={true}
    />
  );
}
