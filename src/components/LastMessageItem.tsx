/** @format */

import { Person, PersonViewType } from "@microsoft/mgt-react";
import React from "react";

export const LastMessageItem = (props: any) => {
  // console.log("props: ", props);

  return (
    <div className="px-2 pt-2">
      <div className="teams-chat-last-message-container-block">
        <div className="teams-chat-conversation-message">
          <Person
            line1Property={"givenName"}
            fetchImage={true}
            userId={props.dataContext.from.user.id}
            showPresence={true}
            personCardInteraction={1}
            view={PersonViewType.twolines}></Person>
          <div
            data-testid="content"
            className={`teams-chat-last-message-content`}>
            {props?.dataContext?.body?.content}
          </div>
        </div>
      </div>
      <div className={`teams-chat-last-message-time`}>
        {/* {props?.dataContext?.displayName} */}
        {/* <created date time> */}
      </div>
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
