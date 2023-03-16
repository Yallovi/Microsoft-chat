/** @format */

import { Person, PersonViewType } from "@microsoft/mgt-react";
import React, { useMemo } from "react";

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

export const ChatComponents = (props: any) => {
  // console.log("props: ", props);

  const credential = useMemo(
    () =>
      new AzureCommunicationTokenCredential(
        "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im81Q0pKTzZmRXpVQ0sya1p6cnVIMlVxenVkR1ZjSVNPZDV0dWhCWS02Z2MiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9"
      ),
    []
  );

  const userId = useMemo(
    () =>
      fromFlatCommunicationIdentifier(
        props?.from?.user?.id
      ) as CommunicationUserIdentifier,
    [props.userIdentifier]
  );

  const adapter = useAzureCommunicationChatAdapter({
    endpoint: props?.dataContext?.webUrl,
    userId,
    credential,
    displayName: props?.from?.user?.displayName,
    threadId: props?.dataContext?.channelIdentity?.channelId,
  });

  return (
    <div>
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

// import {
//   usePropsFor,
//   MessageThread,
//   SendBox,
//   ParticipantItem,
//   ParticipantItemProps,
//   ChatComposite,
// } from "@azure/communication-react";

// import { IContextualMenuItem, PersonaPresence } from "@fluentui/react";

// function ChatComponents(): JSX.Element {
//   const messageThreadProps = usePropsFor(MessageThread);

//   const sendBoxProps = usePropsFor(SendBox);

//   return (
//     <div>
//       <div style={{ height: "50rem", width: "50rem" }}>
//         {/*Props are updated asynchronously, so only render the component once props are populated.*/}

//         {messageThreadProps && <MessageThread {...messageThreadProps} />}
//       </div>
//       {sendBoxProps && <SendBox {...sendBoxProps} />}
//     </div>
//   );
// }

// export default ChatComponents;
