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
import { CustomDataModelExampleContainer } from "./components/ContosoChatContainer";

initializeIcons();
registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

function App(): JSX.Element {
  const endpointUrl = "https://test-chat-1.communication.azure.com/";
  const userAccessToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwNiIsIng1dCI6Im9QMWFxQnlfR3hZU3pSaXhuQ25zdE5PU2p2cyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjVkYzJiOTMzLTdhNmQtNDhlOC05YjUwLTFiZjAzNzcxY2UwYV8wMDAwMDAxNy03ZmVhLWMzZTAtZGY2OC01NjNhMGQwMGI5NmIiLCJzY3AiOjE3OTIsImNzaSI6IjE2Nzg3OTU5MzkiLCJleHAiOjE2Nzg4ODIzMzksInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6ImNoYXQiLCJyZXNvdXJjZUlkIjoiNWRjMmI5MzMtN2E2ZC00OGU4LTliNTAtMWJmMDM3NzFjZTBhIiwicmVzb3VyY2VMb2NhdGlvbiI6InVuaXRlZHN0YXRlcyIsImlhdCI6MTY3ODc5NTkzOX0.ry7enGi3uIQsueoEt33g8EoXbrXqpGonlVmQH15wDHBQnzsgd0Kdnq0BG99otokBVUultmFOn6EBQR3ig0PGB2GiqGb9rI15L1Oysr1iUCJ0KmRD7MK4WOF5YU3x2gWwSop8qW04752MsGglWD8iI6PqZUAVd4rTFc0fLi_tWmZHuvDWU0v6ySBXs1vuQmVHQT3LiD5NqV05PgWlpLqEmyKe5MlWE1Ym_aLSS6V8aDq4tbPbY9XwrM8cCMEat9TqMNJ8yM6zpMPJhVkyrHKkK20WmqjMypAfsmyhcDtn9jXL0ytNWQRK1jA7A7dnAc_9LtfxJFBRBHUfczwgMkUBoQ";
  const userId =
    "8:acs:5dc2b933-7a6d-48e8-9b50-1bf03771ce0a_00000017-7fea-c3e0-df68-563a0d00b96b";
  const tokenCredential = new AzureCommunicationTokenCredential(
    userAccessToken
  );
  const threadId = "19:UQ_g23CaBoHJqk_S26LZ5nLGzVqnfNj9UROW2sGsJjU1@thread.v2";
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
  async function createChatThread() {
    const createChatThreadRequest = {
      topic: "Hello, World!",
    };

    const createChatThreadOptions = {
      participants: [
        {
          id: { communicationUserId: userId },
          displayName: displayName,
        },
      ],
    };
    const createChatThreadResult = await chatClient.createChatThread(
      createChatThreadRequest,
      createChatThreadOptions
    );

    const threadId = createChatThreadResult?.chatThread?.id;

    return threadId;
  }

  // let chatThreadClient: ChatThreadClient;

  //* addParticipantsRequest
  createChatThread().then(async (threadId) => {
    console.log("threadId: ", threadId);
    const addParticipantsRequest = {
      participants: [
        {
          id: {
            communicationUserId:
              "8:acs:5dc2b933-7a6d-48e8-9b50-1bf03771ce0a_00000017-8006-6abe-a166-563a0d00b5e0",
          },
          displayName: "1234qwerasdfzxcv",
        },
      ],
    };

    await chatThreadClient.addParticipants(addParticipantsRequest);
    // chatThreadClient = statefulChatClient.getChatThreadClient(threadId!);
  });

  const chatThreadClient = statefulChatClient.getChatThreadClient(threadId);

  // initializeThreadState(chatThreadClient!);

  // * sendMessageRequest
  // const sendMessageRequest = {
  //   content: "1234qwerasdfzxv?",
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
          <CustomDataModelExampleContainer
            userIdentifier={userId}
            token={userAccessToken}
            displayName={displayName}
            threadId={threadId}
            endpointUrl={endpointUrl}
            botUserId={
              "8:acs:5dc2b933-7a6d-48e8-9b50-1bf03771ce0a_00000017-7a2d-6f68-b967-563a0d007ada"
              // "8:acs:5dc2b933-7a6d-48e8-9b50-1bf03771ce0a_00000017-79ec-3285-a166-563a0d006e5a"
              // "8:acs:5dc2b933-7a6d-48e8-9b50-1bf03771ce0a_00000017-7a14-d298-3dfe-9c3a0d007b21"
            }
            botAvatar={"default"}
            // participants={true}
          />
          {/* <ChatComponents /> */}
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
