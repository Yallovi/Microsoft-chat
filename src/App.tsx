/** @format */

import { Providers, ProviderState } from "@microsoft/mgt-element";
import { Agenda, Get, Login, People } from "@microsoft/mgt-react";
import { useState, useEffect } from "react";
import "./App.css";

import { ChatComponents } from "./components/Chat";
import { LastMessageItem } from "./components/LastMessageItem";

function useIsSignedIn(): [boolean] {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return [isSignedIn];
}

function App() {
  const [isSignedIn] = useIsSignedIn();

  return (
    <div className="App">
      <header className="flex justify-end bg-blue-200">
        <Login />
      </header>
      <div className="flex h-94vh w-full">
        <div className={"w-100 h-full bg-red-200"}>
          <Get
            cacheEnabled={true}
            cacheInvalidationPeriod={36000}
            maxPages={1}
            version="beta"
            // https://teams.microsoft.com/l/team/19%3aTSL7WjS9aMCZjZvwdmugFS_Tw7-Vd7FnQhWobhYQlyU1%40thread.tacv2/conversations?groupId=cb4665a4-c090-4bda-b1fa-9939960ba67b&tenantId=b7e28bed-bd9b-44e2-8236-ffb159f2634c
            // https://teams.microsoft.com/l/channel/19%3aTSL7WjS9aMCZjZvwdmugFS_Tw7-Vd7FnQhWobhYQlyU1%40thread.tacv2/%25D0%259E%25D0%25B1%25D1%2589%25D0%25B8%25D0%25B9?groupId=cb4665a4-c090-4bda-b1fa-9939960ba67b&tenantId=b7e28bed-bd9b-44e2-8236-ffb159f2634c
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
            ]}
            resource={
              //* get teams
              // "/teams"

              //*get team's chats
              // "teams/0eaec614-bcdb-4a62-8075-812d40880818/channels"

              //*get message replies
              "teams/cb4665a4-c090-4bda-b1fa-9939960ba67b/channels/19%3aTSL7WjS9aMCZjZvwdmugFS_Tw7-Vd7FnQhWobhYQlyU1%40thread.tacv2/messages/1678808771474/replies?top=1"
              //teams/<TeamID>/channels/<ChannelID>/messages/<MessageID>/replies
            }>
            <LastMessageItem template="value" />
            {/* <LoadingTemplate template="loading" /> */}
          </Get>
        </div>
        <div className="w-full bg-blue-400">
          <Get
            cache-enabled={true}
            cache-invalidation-period={36000}
            id="messagesGet"
            version="beta"
            resource={
              "teams/cb4665a4-c090-4bda-b1fa-9939960ba67b/channels/19%3aTSL7WjS9aMCZjZvwdmugFS_Tw7-Vd7FnQhWobhYQlyU1%40thread.tacv2/messages/1678808771474/replies"
            }>
            <ChatComponents template="value" />
          </Get>
        </div>
      </div>

      {/* <div>{isSignedIn && <Agenda />}</div> */}
    </div>
  );
}

export default App;
