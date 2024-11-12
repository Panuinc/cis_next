"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { CreateBranch } from "@/app/functions/hr/branch/branch";
import { useSession } from "next-auth/react";
import BranchForm from "@/app/components/hr/branch/BranchForm";

export default function BranchCreate() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [branch_name, setBranch_name] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("branch_name", branch_name);
    formData.append("branch_create_by", session?.user?.user_id);

    try {
      const response = await CreateBranch({
        formData,
      });

      if (response.status === 201) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/hr/branch");
        }, 2000);
      } else {
        setError(response);
        toast.error(response.message);
      }
    } catch (error) {
      setError({ message: "Error creating branch: " + error.message });
      toast.error("Error creating branch: " + error.message);
    }
  };

  return (
    <BranchForm
      branch_name={branch_name}
      setBranch_name={setBranch_name}
      error={error}
      onSubmit={handleSubmit}
      sessionUserName={`${session?.user?.user_firstname} ${session?.user?.user_lastname}`}
    />
  );
}
