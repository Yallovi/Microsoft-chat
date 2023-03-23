/** @format */

import { Get, MgtTemplateProps, Person } from "@microsoft/mgt-react";
import { ChatMessage } from "@microsoft/microsoft-graph-types";
import { FC } from "react";
import "../../App.css";

interface ITeamsThread {
  teamId: string;
  channelId: string;
  chatMessage: ChatMessage;
}

const TeamsThread: FC<ITeamsThread> = (props) => {
  const { channelId, teamId, chatMessage } = props;

  const { id, from, body, lastModifiedDateTime } = chatMessage;

  const HandleRepliesValue = (props: MgtTemplateProps) => {
    const replies = props?.dataContext?.value as ChatMessage[];

    if (!replies?.length) return <></>;

    //     if (!deletedDateTime && messageType !== "systemEventMessage") {
    //       if (!from?.user?.id) return;
    // }

    return (
      <>
        {replies?.map((el, i) => {
          console.log("el: ", el);
          const { deletedDateTime, messageType, from } = el;
          return (
            <div className="flex justify-start items-center bg-gray-200 p-3">
              <div className="flex items-center gap-2">
                <Person
                  userId={from?.user?.id}
                  avatarSize="large"
                  fetchImage
                  showPresence={true}></Person>

                <div className={"flex flex-col"}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-black">
                      {from?.user?.displayName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {lastModifiedDateTime}
                    </span>
                  </div>
                  <div>{el?.body?.content}</div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="teamsThread shadow-gray-500 shadow-lg bg-gray-100 w-full m-2 rounded-lg">
      <div className="teams-message">
        <div className="flex items-center gap-2">
          <span className="teams-message-author-title text-base">
            {from?.user?.displayName}
          </span>
          <span className="teams-message-date text-xs text-gray-500">
            {lastModifiedDateTime}
          </span>
        </div>
        <div>{body?.content}</div>
      </div>

      <Get
        resource={`/teams/${teamId}/channels/${channelId}/messages/${id}/replies`}
        version="beta">
        <HandleRepliesValue />
        {/* <HandleRepliesDefault /> */}
      </Get>
    </div>
  );
};

export default TeamsThread;
