import { VerificationAPI } from "@/api/index.api";
import { toast } from "sonner";
export default function useVerification() {
  const onSubmit = async (data: any) => {
    try {
      const res = await VerificationAPI.post("/", data);
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(
        err.response.data.message || "Opps! Failed to verify credentials"
      );
    }
  };

  return { onSubmit };
}
