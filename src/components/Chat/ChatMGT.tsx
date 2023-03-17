/** @format */

import React, { useEffect, useState } from "react";
import {
  FluentThemeProvider,
  MessageThread,
  DEFAULT_COMPONENT_ICONS,
} from "@azure/communication-react";
import { useGraphChatClient } from "../../statefulClient/useGraphChatClient";
import { registerIcons } from "@fluentui/react";
import { Get } from "@microsoft/mgt-react";
import { MgtTemplateProps } from "@microsoft/mgt-react";
import { Message } from "@microsoft/microsoft-graph-types";
import {
  PublicClientApplication,
  InteractionType,
  AccountInfo,
} from "@azure/msal-browser";

import { Client, ClientOptions } from "@microsoft/microsoft-graph-client";

const error = "error throw by the authentication handler";

export const client = Client.init({
  defaultVersion: "v1.0",
  debugLogging: true,
  authProvider: (done) => {
    done(
      error,
      "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlV4TnVSSmY4TEFIUmhNOVBQWWxyeU1PX1llQ1FvNE1UUWRRUkpSS2RWakUiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iN2UyOGJlZC1iZDliLTQ0ZTItODIzNi1mZmIxNTlmMjYzNGMvIiwiaWF0IjoxNjc5MDU0MDIyLCJuYmYiOjE2NzkwNTQwMjIsImV4cCI6MTY3OTA1ODcyNiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQVNtc3poYkFGa292TmQvemFiZ2wwWFJmQTZwTUNpQU1ralRzU3pnNlhxS1orcGVvMGx1eVk1RGlOM24yUnhsWUYiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6ImNoYXQiLCJhcHBpZCI6IjBkMzBiMTM1LTIxMjAtNDVjYi1hODJiLWMxNDE0Njg4YzY3NCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiV2FsdGVycyIsImdpdmVuX25hbWUiOiJEd2F5bmUiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiI0NS44MC4yMjAuMTgwIiwibmFtZSI6IkR3YXluZSBXYWx0ZXJzIiwib2lkIjoiMTQ2NThiMjMtNmE5OC00YTc5LTgxNjItMWMzNjUzZmMxZjU0IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDNCRkZEODg2MTUxRTkiLCJyaCI6IjAuQVZzQTdZdml0NXU5NGtTQ052LXhXZkpqVEFNQUFBQUFBQUFBd0FBQUFBQUFBQUJiQUlvLiIsInNjcCI6IkNhbGVuZGFycy5SZWFkIENoYW5uZWxNZXNzYWdlLlJlYWQuQWxsIENoYXQuUmVhZCBlbWFpbCBHcm91cC5SZWFkLkFsbCBHcm91cC5SZWFkV3JpdGUuQWxsIE1haWwuUmVhZEJhc2ljIG9wZW5pZCBQZW9wbGUuUmVhZCBQZW9wbGUuUmVhZC5BbGwgUHJlc2VuY2UuUmVhZC5BbGwgcHJvZmlsZSBTaXRlcy5SZWFkLkFsbCBUZWFtLlJlYWRCYXNpYy5BbGwgVGVhbVNldHRpbmdzLlJlYWQuQWxsIFRlYW1TZXR0aW5ncy5SZWFkV3JpdGUuQWxsIFVzZXIuUmVhZCBVc2VyLlJlYWQuQWxsIFVzZXIuUmVhZEJhc2ljLkFsbCIsInN1YiI6InBjYzNQRmJxYnhkeURfRXAyQ1Z1MWFET1dCOGJGOXpILVY2aXNPa3FLWkEiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiJiN2UyOGJlZC1iZDliLTQ0ZTItODIzNi1mZmIxNTlmMjYzNGMiLCJ1bmlxdWVfbmFtZSI6InRlY2hkMUBkd3Nub3cuY29tIiwidXBuIjoidGVjaGQxQGR3c25vdy5jb20iLCJ1dGkiOiJnTmszNHk1dlRVcURrYkpYMUtrUUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCIwOTY0YmI1ZS05YmRiLTRkN2ItYWMyOS01OGU3OTQ4NjJhNDAiLCI4ODM1MjkxYS05MThjLTRmZDctYTljZS1mYWE0OWYwY2Y3ZDkiLCI5Yjg5NWQ5Mi0yY2QzLTQ0YzctOWQwMi1hNmFjMmQ1ZWE1YzMiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3N0Ijp7InN1YiI6ImllN2hrUlFMSjhwLWh5eDViUHFWeUJYblVUX05lams5anhkcnpiaTBCQmcifSwieG1zX3RjZHQiOjEzMDk0NTUxODB9.LjXCZwS0jmPBU8H1ERMb7iv9FieAcuyu2dKIiQOVR4gNNjT6IxDbxxxP86NE3DSFx6dz2SLl_0gAQlKKZ__hpGqXp_vVeMpdB-8Al-Fs3PBA5vqQAjO5AH3j8FvPSyriGwLCF_YCpMPO1mdCuGoisAj7zV5oyGe_jahWWxji5sc45Zb6XcLZKL3rEfvxQEImi1jCO7igCZA8eRuTOVgOFjorXbwHCNLZR6oBcVzowknvDuzXjK1KJA-TgY9H1nYnie-D1nyNTB769RUiyjlE_5DR2HTemqt0n2beEgQ-0sbYrgmSaJUxI8w0wwhT5azsgDBq-GREydzIMRopCe5wgA"
    );
  },
});

registerIcons({ icons: DEFAULT_COMPONENT_ICONS });
interface IMgtChatProps {
  teamId: string;
  channelId: string;
}

export const ChatMGT = ({ teamId, channelId }: IMgtChatProps) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value);
  };

  const handleSendMessage = async () => {
    const chatMessage = {
      body: {
        content: value,
      },
    };

    await client
      .api(`teams/${teamId}/channels/${channelId}/messages`)
      .post(chatMessage);
  };

  const Messages = (props: MgtTemplateProps) => {
    const messages = props?.dataContext?.value as Message[];

    return (
      <>
        {messages?.map((message) => {
          return (
            <div key={message?.id} className={"bg-gray-300 p-2 mb-4"}>
              {message?.body?.content}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <Get resource={`/teams/${teamId}/channels/${channelId}/messages`}>
        <Messages />
      </Get>
      <div className="bg-blue-200 p-3">
        <input value={value} onChange={handleChange} />
        <button
          type="submit"
          className="border border-black ml-5"
          onClick={handleSendMessage}>
          Submit message
        </button>
      </div>
    </div>
  );
};
