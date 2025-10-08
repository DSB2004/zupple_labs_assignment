import { IssuanceAPI } from "@/api/index.api";
import { toast } from "sonner";
export default function useIssuance() {
  const onSubmit = async (data: any) => {
    try {
      const res = await IssuanceAPI.post("/", data);
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(
        err.response.data.message || "Opps! Failed to issue credentials"
      );
    }
  };

  return { onSubmit };
}
