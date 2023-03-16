/** @format */

import {
  Get,
  MgtPerson,
  MgtTemplateProps,
  Person,
  PersonViewType,
} from "@microsoft/mgt-react";

import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import React, { useRef } from "react";

export const LastMessageItem = (props: MgtTemplateProps) => {
  // console.log("props: ", props);

  const OptionTemplate = (props: MgtTemplateProps) => {
    // console.log("props =>", props);
    const channel = props.dataContext;
    return (
      <div className="ml-5">
        {channel?.value?.map((channel: any, i: number) => {
          return <li key={i}>{channel?.displayName}</li>;
        })}
      </div>
    );
  };

  return (
    <div className="px-2 pt-2">
      {/* <div className="teams-chat-last-message-container-block">
        <div className="teams-chat-conversation-message">
          <Person
            line1Property={"givenName"}
            fetchImage={true}
            userId={props.dataContext.from.user.id}
            showPresence={true}
            personCardInteraction={1}
            view={PersonViewType.twolines}
            // onClick={(e) => console.log(e)}
          ></Person>
          <div
            data-testid="content"
            className={`teams-chat-last-message-content`}>
            {props?.dataContext?.displayName}
          </div>
        </div>
      </div> */}
      {/* <select className={`teams-chat-last-message-time`}> */}
      <ul> {props?.dataContext?.displayName}</ul>

      <Get resource={`teams/${props?.dataContext?.id}/channels`}>
        <OptionTemplate />
      </Get>

      {/* </select> */}
    </div>
  );
};

{
  /* <div className={`teams-chat-last-message-time`}>
        {props?.dataContext?.displayName}
      </div> */
}

// <div className={`teams-chat-last-message-time`}>
//   {props?.dataContext?.body?.content}
// </div>
