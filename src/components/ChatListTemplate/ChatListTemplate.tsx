/** @format */

import React from "react";
import { MgtTemplateProps } from "@microsoft/mgt-react";
import { Chat, Team } from "@microsoft/microsoft-graph-types";
import TeamItem, { ChatInteractionProps } from "../ChatItem/ChatItem";

const ChatListTemplate = (props: MgtTemplateProps & ChatInteractionProps) => {
  const { value } = props.dataContext;
  const Team: Team[] = value;

  return (
    <ul className="p-2 border border-black ">
      {Team.map((T) => (
        <TeamItem
          key={T.id}
          team={T}
          onSelected={props.onSelected}
          channelSelected={props.channelSelected}
        />
      ))}
    </ul>
  );
};

export default ChatListTemplate;
