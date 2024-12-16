/*کد اولیه 
import { toast } from "sonner";

export const http: typeof fetch = async (input, init) => {
  const res = await fetch(input, init);
  if (!res.ok) {
    const body = await res.json();
    const msg = body["error"] || "Network Error";
    toast.error(msg);
    throw Error(msg);
  }
  return res;
};
*/
import { toast } from "sonner";

export const http: typeof fetch = async (input, init) => {
  try {
    const res = await fetch(input, init);

    if (!res.ok) {
      let msg = `HTTP error! Status: ${res.status}`;

      try {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const body = await res.json();
          if (body && body.error) {
            msg = body.error;
          }
        }
      } catch (error) {
        console.error("Error parsing response:", error);
      }

      toast.error(msg);
      throw new Error(msg);
    }

    return res;
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Network Error";
    toast.error(msg, {
      description: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
};
