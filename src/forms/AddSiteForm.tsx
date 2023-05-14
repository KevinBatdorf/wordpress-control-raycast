import { Action, ActionPanel, Form, Toast, showToast, useNavigation } from "@raycast/api";
import { useState } from "react";
import { version } from "../lib/wp";
import { addSite } from "../lib/db";
import { flashErrorDetails } from "../lib/errors";

export const AddSiteForm = ({ callback }: { callback?: () => unknown }) => {
  const [nameError, setNameError] = useState<string>();
  const [locationError, setLocationError] = useState<string>();
  const [wpVersion, setWPVersion] = useState<string>();
  const { push, pop } = useNavigation();

  const maybeResetName = () => nameError && setNameError(undefined);
  const maybeResetLocation = () => locationError && setLocationError(undefined);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Add Site"
            onSubmit={async (values) => {
              const site = await addSite({ name: values.name, location: values.location[0] });
              pop();
              callback?.();
              showToast({
                title: "Site Added",
                message: site.name,
                style: Toast.Style.Success,
              });
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="name"
        title="Name"
        defaultValue="My Site"
        error={nameError}
        onChange={maybeResetName}
        onBlur={(event) => {
          if (!event.target.value) {
            return setNameError("Name is required");
          }
          maybeResetName();
        }}
      />
      <Form.FilePicker
        title="Directory"
        allowMultipleSelection={false}
        canChooseDirectories
        canChooseFiles={false}
        id="location"
        error={locationError}
        onChange={async (paths) => {
          maybeResetLocation();
          setWPVersion(undefined);
          const path = paths[0];
          let cliVersion;
          try {
            cliVersion = await version({ path });
          } catch (error) {
            setLocationError("Error confirming WP install");
            flashErrorDetails(error, push);
            return;
          }
          setWPVersion(cliVersion?.trim());
        }}
      />
      <Form.Description
        title=""
        text={
          wpVersion
            ? `WordPress ${wpVersion} detected!`
            : "The extension will attempt to run `wp core version` to verify that the directory is a WordPress installation"
        }
      />
    </Form>
  );
};
