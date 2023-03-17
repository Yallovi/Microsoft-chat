/** @format */

import { Providers } from "@microsoft/mgt-element";
import { Get, MgtTemplateProps } from "@microsoft/mgt-react";
import {
  Team,
  AadUserConversationMember,
  Channel,
} from "@microsoft/microsoft-graph-types";
import React, { useCallback, useEffect, useState } from "react";

export interface ChatInteractionProps {
  onSelected: (selected: Team) => void;
  channelSelected: (selected: Channel) => void;
}

interface ChatItemProps {
  team: Team;
}

const TeamItem = ({
  team: team,
  onSelected,
  channelSelected,
}: ChatItemProps & ChatInteractionProps) => {
  const [myId, setMyId] = useState<string>();

  useEffect(() => {
    const getMyId = async () => {
      const me = await Providers.me();
      setMyId(me.id);
    };
    if (!myId) {
      void getMyId();
    }
  }, [myId]);

  const RenderChannels = (props: MgtTemplateProps) => {
    const channel: Channel[] = props?.dataContext?.value;

    return (
      <div className=" ml-5">
        {channel?.map((c, i) => {
          return (
            <div
              className="bg-gray-200 mb-2"
              key={c.id}
              onClick={(e) => {
                e.stopPropagation();
                console.log("channel => ", c.id);
                channelSelected(c);
              }}>
              {c.displayName}
            </div>
          );
        })}
      </div>
    );
  };

  const inferTitle = useCallback(
    (team: Team) => {
      return (
        <div>
          <span>{team.displayName}</span>
          <Get resource={`teams/${team.id}/channels`}>
            <RenderChannels />
          </Get>
        </div>
      );
    },
    [myId]
  );

  return (
    <div
      className="cursor-pointer p-2 border border-gray"
      onClick={(e) => {
        console.log("team =>", team.id);
        e.stopPropagation();
        onSelected(team);
      }}>
      {inferTitle(team)}
    </div>
  );
};

export default TeamItem;
