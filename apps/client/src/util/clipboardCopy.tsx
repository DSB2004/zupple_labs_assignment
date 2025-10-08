import { toast } from "sonner";

function CopyToClipboard(content: any) {
  const jsonString = JSON.stringify(content);
  navigator.clipboard
    .writeText(jsonString)
    .then(() => {
      toast.info("Copied to clipboard!");
    })
    .catch(() => {
      toast.error("Failed to copy");
    });
}

export { CopyToClipboard };
