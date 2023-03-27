/** @format */

import { FluentThemeProvider, MessageThread } from "@azure/communication-react";
import { Get, Login, MgtLogin, Providers } from "@microsoft/mgt-react";
import { Chat } from "@microsoft/microsoft-graph-types";
import { FC, useState, useCallback } from "react";
import ChatListTemplate from "./components/ChatListTemplate";
import { Person, PersonCardInteraction } from "@microsoft/mgt-react";

interface IApp {}

const client = Providers;
// console.log("client: ", client);

const App: FC<IApp> = (props) => {
  const {} = props;

  const [chatId, setChatId] = useState<string>();

  const chatSelected = useCallback(
    (e: Chat) => {
      console.log("e: ", e);
      setChatId(e.id);
    },
    [setChatId]
  );

  const HandleChat = (props: any) => {
    const { value } = props?.dataContext;
    return (
      <FluentThemeProvider>
        <MessageThread
          userId={"14658b23-6a98-4a79-8162-1c3653fc1f54"}
          messages={value}
          showMessageDate={true}
          // disableEditing={chatState.disableEditing}
          // TODO: Establish how to stop loading more messages and have it load more as part of an infinite scroll
          // numberOfChatMessagesToReload={chatState.numberOfChatMessagesToReload}
          // onLoadPreviousChatMessages={chatState.onLoadPreviousChatMessages}
          // TODO: Messages date rendering is behind beta flag, find out how to enable it
          // onDisplayDateTimeString={(date: Date) => date.toISOString()}

          // current behavior for re-send is a delete call with the clientMessageId and the a new send call
          // onDeleteMessage={chatState.onDeleteMessage}
          // onSendMessage={chatState.onSendMessage}
          // onUpdateMessage={chatState.onUpdateMessage}
          // render props
          onRenderAvatar={(userId?: string) => {
            console.log("userId=>", userId);
            return (
              <Person
                userId={userId}
                avatarSize="small"
                personCardInteraction={PersonCardInteraction.click}
              />
            );
          }}
        />
        {/* <SendBox
              autoFocus="sendBoxTextField"
              onSendMessage={chatState.onSendMessage}
            /> */}
        {/* <ErrorBar activeErrorMessages={chatState.activeErrorMessages} /> */}
      </FluentThemeProvider>
    );
  };

  return (
    <>
      <Login></Login>
      <div className="flex">
        <div>
          <Get resource="me/chats" scopes={["chat.read"]} cacheEnabled={true}>
            <ChatListTemplate template="default" onSelected={chatSelected} />
          </Get>
        </div>
        <div className="w-full">
          {chatId && (
            <Get
              resource={`/teams/{team-id}/channels/{channel-id}/threads/{thread-id}`}>
              <HandleChat />
            </Get>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
