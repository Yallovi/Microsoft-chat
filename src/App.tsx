/** @format */

import { Get, Login } from "@microsoft/mgt-react";
import { useState, useCallback, useEffect } from "react";
import { Team, Channel } from "@microsoft/microsoft-graph-types";
import ChatListTemplate from "./components/ChatListTemplate/ChatListTemplate";

import "./App.css";
import { ChatMGT } from "./components/Chat/ChatMGT";
import { FluentThemeProvider, MessageThread } from "@azure/communication-react";
import { getExistingTokenFromURL, getToken } from "./utils/getToken";
import { CustomDataModelExampleContainer } from "./components/ContosoChatContainer";

function App() {
  const [teamId, setTeamId] = useState<string>();
  const [channelId, setChannelId] = useState<string>();

  const teamSelected = useCallback(
    (e: Team) => {
      setTeamId(e.id);
    },
    [setTeamId]
  );

  const channelSelected = useCallback(
    (e: Channel) => {
      setChannelId(e.id);
    },
    [setChannelId]
  );

  // useEffect(() => {
  //   getToken().then((data) => console.log(data));
  // }, []);

  const RenderTest = (props: any) => {
    console.log("props =>", props);

    return <div>hello</div>;
  };

  return (
    <div className="App">
      <header className="App-header ">
        <Login />
      </header>
      <div className="flex">
        <div className="h-90vh overflow-auto">
          <Get
            cacheEnabled={true}
            cacheInvalidationPeriod={36000}
            maxPages={1}
            version="beta"
            resource="/teams"
            scopes={[
              "ChannelMessage.Read.All",
              "Group.Read.All",
              "Group.ReadWrite.All",
              "Calendars.Read",
              "openid",
              "People.Read",
              "profile",
              "User.Read",
              "User.ReadBasic.All",
              "email",
              "Team.ReadBasic.All",
              "TeamSettings.Read.All",
              "TeamSettings.ReadWrite.All",
              "Presence.Read.All",
            ]}>
            <ChatListTemplate
              template="default"
              onSelected={teamSelected}
              channelSelected={channelSelected}
            />
          </Get>
        </div>
        {teamId && channelId && (
          <ChatMGT teamId={teamId} channelId={channelId} />
        )}
      </div>
      <Get
        cacheEnabled={true}
        cacheInvalidationPeriod={36000}
        maxPages={1}
        version="beta"
        resource="/me"
        scopes={[
          "ChannelMessage.Read.All",
          "Group.Read.All",
          "Group.ReadWrite.All",
          "Calendars.Read",
          "openid",
          "People.Read",
          "profile",
          "User.Read",
          "User.ReadBasic.All",
          "email",
          "Team.ReadBasic.All",
          "TeamSettings.Read.All",
          "TeamSettings.ReadWrite.All",
          "Presence.Read.All",
        ]}>
        {<RenderTest />}
      </Get>
    </div>
  );
}

export default App;
