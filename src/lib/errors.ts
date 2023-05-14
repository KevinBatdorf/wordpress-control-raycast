import { Detail, Toast, showToast } from "@raycast/api";
import { ReactNode, createElement } from "react";
import { ProcessOutput } from "zx";

export const flashErrorDetails = async (error: unknown, push: (component: ReactNode) => unknown) => {
  await showToast({
    title: "Something went wrong",
    style: Toast.Style.Failure,
    primaryAction: {
      title: "View Error output",
      onAction: (toast) => {
        push(
          createElement(Detail, {
            markdown:
              error instanceof ProcessOutput
                ? error.stderr
                : error instanceof Error
                ? ((error?.message ?? "") as string)
                : "Unknown error",
          })
        );
        toast.hide();
      },
    },
  });
};
