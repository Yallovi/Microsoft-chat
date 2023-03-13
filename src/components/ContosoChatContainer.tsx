/** @format */

import {
  AzureCommunicationTokenCredential,
  CommunicationUserIdentifier,
} from "@azure/communication-common";
import {
  AvatarPersonaData,
  ChatComposite,
  CompositeLocale,
  fromFlatCommunicationIdentifier,
  ParticipantMenuItemsCallback,
  useAzureCommunicationChatAdapter,
} from "@azure/communication-react";
import { IContextualMenuItem, PartialTheme, Theme } from "@fluentui/react";
import React, { useMemo } from "react";

export interface CustomDataModelExampleContainerProps {
  /** UserIdentifier is of type CommunicationUserIdentifier see below how to construct it from a string input */
  userIdentifier: string;
  token: string;
  displayName: string;
  endpointUrl: string;
  threadId: string;
  botUserId: string;
  botAvatar: string;
  fluentTheme?: PartialTheme | Theme;
  locale?: CompositeLocale;
}

export const CustomDataModelExampleContainer = (
  props: CustomDataModelExampleContainerProps
): JSX.Element => {
  // Arguments to `useAzureCommunicationChatAdapter` must be memoized to avoid recreating adapter on each render.
  const credential = useMemo(
    () => new AzureCommunicationTokenCredential(props.token),
    [props.token]
  );

  const userId = useMemo(
    () =>
      fromFlatCommunicationIdentifier(
        props.userIdentifier
      ) as CommunicationUserIdentifier,
    [props.userIdentifier]
  );

  const adapter = useAzureCommunicationChatAdapter({
    endpoint: props.endpointUrl,
    userId,
    // Data model injection: The display name for the local user comes from Contoso's data model.
    displayName: props.displayName,
    credential,
    threadId: props.threadId,
  });

  const onFetchAvatarPersonaData = (
    userId: string
  ): Promise<AvatarPersonaData> =>
    new Promise((resolve) => {
      if (userId === props.botUserId) {
        return resolve({
          imageInitials: props.botAvatar,
          initialsColor: "white",
        });
      }
    });

  // Custom Menu Item Callback for Participant List
  const onFetchParticipantMenuItems: ParticipantMenuItemsCallback = (
    participantId,
    userId,
    defaultMenuItems
  ) => {
    console.log("Remote Participant", participantId);
    console.log("Current Participant", userId);
    let customMenuItems: IContextualMenuItem[] = [
      {
        key: "Custom Menu Item",
        text: "Custom Menu Item",
        onClick: () => console.log("Custom Menu Item Clicked"),
      },
    ];
    if (defaultMenuItems) {
      customMenuItems = customMenuItems.concat(defaultMenuItems);
    }
    return customMenuItems;
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {adapter ? (
        <ChatComposite
          fluentTheme={props.fluentTheme}
          adapter={adapter}
          onFetchAvatarPersonaData={onFetchAvatarPersonaData}
          onFetchParticipantMenuItems={onFetchParticipantMenuItems}
          locale={props.locale}
          options={{ topic: true, errorBar: true }} //participantPane: true
        />
      ) : (
        <h3
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50%",
          }}>
          Loading...
        </h3>
      )}
    </div>
  );
};
