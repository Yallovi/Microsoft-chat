/** @format */

import { ChatThreadClient } from "@azure/communication-chat";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import { ChatClient } from "@azure/communication-chat";

import {
  createStatefulChatClient,
  FluentThemeProvider,
  ChatClientProvider,
  ChatThreadClientProvider,
  DEFAULT_COMPONENT_ICONS,
} from "@azure/communication-react";
import { initializeIcons, registerIcons } from "@fluentui/react";
import React from "react";
import ChatComponents from "./components/Chat";

initializeIcons();
registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

function App(): JSX.Element {
  const endpointUrl = "https://test-chat-1.communication.azure.com/";
  const userAccessToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNiIsIng1dCI6Im9QMWFxQnlfR3hZU3pSaXhuQ25zdE5PU2p2cyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjVkYzJiOTMzLTdhNmQtNDhlOC05YjUwLTFiZjAzNzcxY2UwYV8wMDAwMDAxNy02YTdhLTJkMmMtZTE2Ny01NjNhMGQwMDQ0YzAiLCJzY3AiOjE3OTIsImNzaSI6IjE2Nzg0MzYyMzkiLCJleHAiOjE2Nzg1MjI2MzksInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6ImNoYXQiLCJyZXNvdXJjZUlkIjoiNWRjMmI5MzMtN2E2ZC00OGU4LTliNTAtMWJmMDM3NzFjZTBhIiwicmVzb3VyY2VMb2NhdGlvbiI6InVuaXRlZHN0YXRlcyIsImlhdCI6MTY3ODQzNjIzOX0.bA4_QSVZlGPFAgnn7o4fPxL0nLOovtOxgcfHY_FcqBrxxiw41b8yFooY8yiLcnM1Ku3he63fTQkB6JbB0YbY03DndausQvFFWFyVEHxCPMR9CWa5kGsipljtqNtV6Y5eZdP2fnBVU_Yp--rXD92-6anKWhqRkEbpIejh2txKw2uW2v5tpAtpNl9k-6lQsOKq0sLleG7uU6B7BZjb1oWSgNdb3PULbhwdo5TMXi1niDFvzVyxQSAYys-mPAl-CsnprvjbMX_6uxfIJk8ffSYjFtoj8tdNpcKjQ499cwN7mpo78BCa9APJjg_1LEK5wbyp4APvFMKsMk_fAo_YrF7IlQ";
  const userId =
    "8:acs:5dc2b933-7a6d-48e8-9b50-1bf03771ce0a_00000017-6a7a-2d2c-e167-563a0d0044c0";
  const tokenCredential = new AzureCommunicationTokenCredential(
    userAccessToken
  );
  const threadId = "19:EvsRy6dZUwIVhehaR4ssmnP4epby_J0WQhlIl6y3EgU1@thread.v2";
  const displayName = "John";

  // Instantiate the statefulChatClient
  const statefulChatClient = createStatefulChatClient({
    userId: { communicationUserId: userId },
    displayName: displayName,
    endpoint: endpointUrl,
    credential: tokenCredential,
  });

  // Listen to notifications
  statefulChatClient.startRealtimeNotifications();

  let chatClient = new ChatClient(
    endpointUrl,
    new AzureCommunicationTokenCredential(userAccessToken)
  );

  // * Create a threadID
  // async function createChatThread() {
  //   const createChatThreadRequest = {
  //     topic: "Hello, World!",
  //   };

  //   const createChatThreadOptions = {
  //     participants: [
  //       {
  //         id: { communicationUserId: userId },
  //         displayName: displayName,
  //       },
  //     ],
  //   };
  //   const createChatThreadResult = await chatClient.createChatThread(
  //     createChatThreadRequest,
  //     createChatThreadOptions
  //   );

  //   const threadId = createChatThreadResult?.chatThread?.id;

  //   return threadId;
  // }

  // let chatThreadClient: ChatThreadClient;

  //* addParticipantsRequest
  // createChatThread().then(async (threadId) => {
  //   console.log("threadId: ", threadId);
  //   const addParticipantsRequest = {
  //     participants: [
  //       {
  //         id: {
  //           communicationUserId:
  //             "8:acs:5dc2b933-7a6d-48e8-9b50-1bf03771ce0a_00000017-6a97-f2a1-a166-563a0d000ca5",
  //         },
  //         displayName: "Jane",
  //       },
  //     ],
  //   };

  //   await chatThreadClient.addParticipants(addParticipantsRequest);
  //   // chatThreadClient = statefulChatClient.getChatThreadClient(threadId!);
  // });

  const chatThreadClient = statefulChatClient.getChatThreadClient(threadId);

  initializeThreadState(chatThreadClient!);

  // * sendMessageRequest
  // const sendMessageRequest = {
  //   content: "how are you?",
  // };
  // let sendMessageOptions = {
  //   senderDisplayName: "Jane",
  //   type: "text",
  //   metadata: {
  //     hasAttachment: "true",
  //     attachmentUrl: endpointUrl,
  //   },
  // };
  // const sendChatMessageResult = chatThreadClient.sendMessage(
  //   sendMessageRequest,
  //   sendMessageOptions
  // );
  // const messageId = sendChatMessageResult.id;
  // console.log(`Message sent!, message id:${messageId}`);

  // Fetch thread properties, participants etc.
  // Past messages are fetched as needed when the user scrolls to them.

  return (
    <FluentThemeProvider>
      <ChatClientProvider chatClient={statefulChatClient}>
        <ChatThreadClientProvider chatThreadClient={chatThreadClient}>
          <ChatComponents />
        </ChatThreadClientProvider>
      </ChatClientProvider>
    </FluentThemeProvider>
  );
}

async function initializeThreadState(
  chatThreadClient: ChatThreadClient
): Promise<void> {
  await chatThreadClient.getProperties();
  for await (const _page of chatThreadClient.listParticipants().byPage()) {
    // Simply fetching participants updates the cached state in client.
  }
}

export default App;
