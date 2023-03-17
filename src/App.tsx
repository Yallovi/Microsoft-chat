/** @format */

import { Get, Login } from "@microsoft/mgt-react";
import { usePropsFor } from "@azure/communication-react";
import { useState, useEffect, useCallback } from "react";
import { Chat, Team, Channel } from "@microsoft/microsoft-graph-types";
import ChatListTemplate from "./components/ChatListTemplate/ChatListTemplate";

import "./App.css";
import { ChatMGT } from "./components/Chat/ChatMGT";

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

  return (
    <div className="App">
      <header className="App-header ">
        <Login />
      </header>
      <div className="flex">
        <Get
          cacheEnabled={true}
          cacheInvalidationPeriod={36000}
          maxPages={1}
          version="beta"
          resource="/teams"
          //scopes={["chat.read"]}
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

        {teamId && channelId && (
          <ChatMGT teamId={teamId} channelId={channelId} />
        )}
      </div>
    </div>
  );
}

export default App;
