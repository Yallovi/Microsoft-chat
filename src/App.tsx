/** @format */

import {
  FluentThemeProvider,
  MessageStatus,
  MessageThread,
} from "@azure/communication-react";
import {
  Get,
  Login,
  MgtLogin,
  MgtTemplateProps,
  Providers,
  SelectedChannel,
  TeamsChannelPicker,
} from "@microsoft/mgt-react";
import { Chat, Message } from "@microsoft/microsoft-graph-types";
import { FC, useState, useCallback } from "react";
import ChatListTemplate from "./components/ChatListTemplate";
import { Person, PersonCardInteraction } from "@microsoft/mgt-react";

interface IApp {}

const App: FC<IApp> = (props) => {
  const {} = props;
  const [teamsId, setTeamsId] = useState<string>();
  const [channelId, setChannelId] = useState<string>();

  const handleSelectedChannel = (
    props: CustomEvent<SelectedChannel | null>
  ) => {
    setChannelId(props?.detail?.channel?.id);
    setTeamsId(props?.detail?.team?.id);
  };

  const HandleMessageAndPerson = (props: MgtTemplateProps) => {
    const replies = props?.dataContext?.value as any[];

    if (!replies?.length) return null;
    return replies?.map((reply) => {
      return (
        <div key={reply?.id} className={"ml-3"}>
          {reply?.body?.content}
        </div>
      );
    });
  };

  const RenderLastMessage = (props: MgtTemplateProps) => {
    const messages = props?.dataContext?.value as Message[];
    console.log("messages: ", messages);

    return (
      <>
        {messages?.map((message: any) => {
          return (
            <div key={message?.id}>
              <div>{message?.body?.content}</div>
              <Get
                resource={`teams/${message?.channelIdentity?.teamId}/channels/${message?.channelIdentity?.channelId}/messages/${message?.id}/replies?$top=1`}>
                <HandleMessageAndPerson />
              </Get>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Login></Login>
      <div className="flex">
        <div>
          <TeamsChannelPicker selectionChanged={handleSelectedChannel} />
          {teamsId && channelId && (
            <Get
              resource={`teams/${teamsId}/channels/${channelId}/messages`}
              cacheEnabled={true}>
              <RenderLastMessage />
              {/* <ChatListTemplate template="default" onSelected={chatSelected} /> */}
            </Get>
          )}
        </div>
        <div className="w-full">
          {/* {chatId && (
            <Get resource={`/chats/${chatId}/messages`}>
              <HandleChat />
            </Get>
          )} */}
        </div>
      </div>
    </>
  );
};

export default App;

{
  /* <FluentThemeProvider>
        <MessageThread
          userId={""}
          messages={messages}
          showMessageDate={true}
          onRenderAvatar={(userId?: string) => {
            return (
              <Person
                userId={userId}
                avatarSize="small"
                personCardInteraction={PersonCardInteraction.click}
              />
            );
          }}
        />
      </FluentThemeProvider> */
}
