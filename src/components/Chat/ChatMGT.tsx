/** @format */

/** @format */

import React, { useEffect, useState } from "react";
import { DEFAULT_COMPONENT_ICONS } from "@azure/communication-react";
import { registerIcons } from "@fluentui/react";
import { Get } from "@microsoft/mgt-react";
import { MgtTemplateProps } from "@microsoft/mgt-react";
import { Message, ChatMessage } from "@microsoft/microsoft-graph-types";

import { Client } from "@microsoft/microsoft-graph-client";
import { FluentThemeProvider, MessageThread } from "@azure/communication-react";
import ChatComponents from "../Chat";

const error = "error throw by the authentication handler";

export const client = Client.init({
  defaultVersion: "v1.0",
  debugLogging: true,
  authProvider: (done) => {
    done(
      error,
      "eyJ0eXAiOiJKV1QiLCJub25jZSI6ImxvVWhyZnY0RV83ZW82UzR3Sk81NF9IQnh4Sno0NmF5ZHMwVnFYdmNINEUiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iN2UyOGJlZC1iZDliLTQ0ZTItODIzNi1mZmIxNTlmMjYzNGMvIiwiaWF0IjoxNjc5MDY3MDI5LCJuYmYiOjE2NzkwNjcwMjksImV4cCI6MTY3OTA3MjM5NCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQTFRVEtaRWV2aDZYOXRWTnkwRWdjZjB4U2lvWCtHSVhwMTRuUWtFUHBzdEo2V3RsbXVJYVcwZ2dBRmFPa2FDcmsiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6ImNoYXQiLCJhcHBpZCI6IjBkMzBiMTM1LTIxMjAtNDVjYi1hODJiLWMxNDE0Njg4YzY3NCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiV2FsdGVycyIsImdpdmVuX25hbWUiOiJEd2F5bmUiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiI0NS44MC4yMjAuMTgwIiwibmFtZSI6IkR3YXluZSBXYWx0ZXJzIiwib2lkIjoiMTQ2NThiMjMtNmE5OC00YTc5LTgxNjItMWMzNjUzZmMxZjU0IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDNCRkZEODg2MTUxRTkiLCJyaCI6IjAuQVZzQTdZdml0NXU5NGtTQ052LXhXZkpqVEFNQUFBQUFBQUFBd0FBQUFBQUFBQUJiQUlvLiIsInNjcCI6IkNhbGVuZGFycy5SZWFkIENoYW5uZWxNZXNzYWdlLlJlYWQuQWxsIENoYXQuUmVhZCBlbWFpbCBHcm91cC5SZWFkLkFsbCBHcm91cC5SZWFkV3JpdGUuQWxsIE1haWwuUmVhZEJhc2ljIG9wZW5pZCBQZW9wbGUuUmVhZCBQZW9wbGUuUmVhZC5BbGwgUHJlc2VuY2UuUmVhZC5BbGwgcHJvZmlsZSBTaXRlcy5SZWFkLkFsbCBUZWFtLlJlYWRCYXNpYy5BbGwgVGVhbVNldHRpbmdzLlJlYWQuQWxsIFRlYW1TZXR0aW5ncy5SZWFkV3JpdGUuQWxsIFVzZXIuUmVhZCBVc2VyLlJlYWQuQWxsIFVzZXIuUmVhZEJhc2ljLkFsbCIsInN1YiI6InBjYzNQRmJxYnhkeURfRXAyQ1Z1MWFET1dCOGJGOXpILVY2aXNPa3FLWkEiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiJiN2UyOGJlZC1iZDliLTQ0ZTItODIzNi1mZmIxNTlmMjYzNGMiLCJ1bmlxdWVfbmFtZSI6InRlY2hkMUBkd3Nub3cuY29tIiwidXBuIjoidGVjaGQxQGR3c25vdy5jb20iLCJ1dGkiOiJrYk5MUy1NUTRrQ01DeHI1X2xsMkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCIwOTY0YmI1ZS05YmRiLTRkN2ItYWMyOS01OGU3OTQ4NjJhNDAiLCI4ODM1MjkxYS05MThjLTRmZDctYTljZS1mYWE0OWYwY2Y3ZDkiLCI5Yjg5NWQ5Mi0yY2QzLTQ0YzctOWQwMi1hNmFjMmQ1ZWE1YzMiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3N0Ijp7InN1YiI6ImllN2hrUlFMSjhwLWh5eDViUHFWeUJYblVUX05lams5anhkcnpiaTBCQmcifSwieG1zX3RjZHQiOjEzMDk0NTUxODB9.l3R23IdDoV6YJXUYJyFEhrGAoavX3y2FqL-iWAXdpdJ7cp5nLqvdPgXe7EvAxGBTt0FTEQbyDvsveHBadMUxk1cjTiCFgmB0RWCTQamdgX4r1_ettGA-kCSDDFPzhpQgS_5WkdXa4rZrx-wVxVnDJUMctKRDr1qpUvgTU6VXsG_Mzv7EtatCYQiF0scsHVu6ZEwnGMhqOMT_HdF0QeD4q9d8zrsYmAcNYPME0pAkkEOwvxWRoNhwv4UVh75-IWsbtu315rCZsFp5NOBgSO4c23uK2aOuroCvYj3PTN4mVch75DdgV7PYyWOY9I4oghgw8Q8xXY2K5WwhOFdW1wrevQ"
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
    const messages: ChatMessage[] = props?.dataContext?.value;

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
        <ChatComponents />
      </Get>
      {/* <div className="bg-blue-200 p-3">
        <input value={value} onChange={handleChange} />
        <button
          type="submit"
          className="border border-black ml-5"
          onClick={handleSendMessage}>
          Submit message
        </button>
      </div> */}
    </div>
  );
};
