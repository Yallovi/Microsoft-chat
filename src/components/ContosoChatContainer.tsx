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

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {adapter ? (
        <ChatComposite
          fluentTheme={props.fluentTheme}
          adapter={adapter}
          locale={props.locale}
        />
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};
