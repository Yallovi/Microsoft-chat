/** @format */

import React, { memo, useCallback, useState } from "react";
import "./App.css";
import {
  Get,
  Login,
  MgtTemplateProps,
  Person,
  SelectedChannel,
  TeamsChannelPicker,
} from "@microsoft/mgt-react";

import { Chat, ChatMessage } from "@microsoft/microsoft-graph-types";
import ChatListTemplate from "./components/ChatListTemplate/ChatListTemplate";
import TeamsThread from "./components/teamsThread/TeamsThread";

function App() {
  // const [chatId, setChatId] = useState<string>();
  // const chatSelected = useCallback(
  //   (e: Chat) => {
  //     setChatId(e.id);
  //   },
  //   [setChatId]
  // );

  const [channelId, setChannelId] = useState<string>("");
  const [teamId, setTeamId] = useState<string>("");

  const handleSelectionChanged = (event: any) => {
    const details = event?.detail as SelectedChannel[];

    const { channel, team } = details[0];

    if (!team.id || !channel.id) return;

    setTeamId(team?.id);
    setChannelId(channel?.id);
  };

  const HandleContent = (props: MgtTemplateProps) => {
    const ChatMessages = props?.dataContext?.value as ChatMessage[];

    return (
      <>
        {ChatMessages?.map((chatMessage, i) => {
          const { from, deletedDateTime, messageType } = chatMessage;

          if (deletedDateTime && messageType === "systemEventMessage") return;
          else if (!from?.user?.id) return;

          return (
            <div key={i} className="teamsContent flex items-start">
              <div className="teams-message-author-avatar ">
                <Person
                  userId={from?.user?.id}
                  avatarSize={"large"}
                  fetchImage={true}
                  personCardInteraction={1}
                  showPresence={true}></Person>
              </div>
              <TeamsThread
                teamId={teamId}
                channelId={channelId}
                chatMessage={chatMessage}
              />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        Mgt Chat test harness
        <br />
        <Login />
      </header>

      <TeamsChannelPicker
        selectionChanged={handleSelectionChanged}></TeamsChannelPicker>
      <div>
        {teamId && channelId && (
          <Get
            version="beta"
            resource={`teams/${teamId}/channels/${channelId}/messages/delta`}>
            <HandleContent />
          </Get>
        )}
      </div>
    </div>
  );
}

export default App;

// <div className="teams-thread">
//           <div className="teams-message">
//             <mgt-person id="mgt-person-author" user-id="{{from.user.id}}">
//               <template type="default">
//                 <span className="teams-message-author-title"
//                   >{{ person.displayName }}
//                 </span>
//                 <span class="teams-message-date"
//                   >{{ formatDate($parent.lastModifiedDateTime)}}</span
//                 >
//               </template>
//             </mgt-person>

//             <div data-props="innerHTML: body.content"></div>
//           </div>

//           <mgt-get
//             resource="/teams/{{ currentTeamId }}/channels/{{ currentChannelId }}/messages/{{ id }}/replies"
//             version="beta"
//           >
//             <template data-type="default">
//               <div data-if="{{ value.length > 0 }}" className="teams-replies"></div>
//             </template>
//             <template data-type="value">
//               <div
//                 data-if="!deletedDateTime && messageType !== 'systemEventMessage'"
//                 className="teams-content teams-reply"
//               >
//                 <div className="teams-message-reply-author-avatar">
//                   <mgt-person
//                     user-id="{{from.user.id}}"
//                     avatar-size="large"
//                     view="avatar"
//                     person-card="hover"
//                     show-presence="true"
//                     className="mgt-person-medium"
//                   >
//                   </mgt-person>
//                 </div>
//                 <div className="teams-message-reply">
//                   <mgt-person id="mgt-person-author" user-id="{{from.user.id}}">
//                     <template type="default">
//                       <span className="teams-message-author-title"
//                         >{{ person.displayName }}
//                       </span>
//                       <span className="teams-message-date"
//                         >{{ formatDate($parent.lastModifiedDateTime)}}</span
//                       >
//                     </template>
//                   </mgt-person>
//                   <div data-props="innerHTML: body.content"></div>
//                 </div>
//               </div>
//             </template>
//           </mgt-get>
//         </div>

//  <mgt-get id="mgt-teams-channel-messages" version="beta">
//     <template data-type="value">
//       <div
//         data-if="!deletedDateTime && messageType !== 'systemEventMessage'"
//         class="teams-content"
//       >

//         <div class="teams-thread">
//           <div class="teams-message">
//             <mgt-person id="mgt-person-author" user-id="{{from.user.id}}">
//               <template type="default">
//                 <span class="teams-message-author-title"
//                   >{{ person.displayName }}
//                 </span>
//                 <span class="teams-message-date"
//                   >{{ formatDate($parent.lastModifiedDateTime)}}</span
//                 >
//               </template>
//             </mgt-person>

//             <div data-props="innerHTML: body.content"></div>
//           </div>

//           <mgt-get
//             resource="/teams/{{ currentTeamId }}/channels/{{ currentChannelId }}/messages/{{ id }}/replies"
//             version="beta"
//           >
//             <template data-type="default">
//               <div data-if="{{ value.length > 0 }}" class="teams-replies"></div>
//             </template>
//             <template data-type="value">
//               <div
//                 data-if="!deletedDateTime && messageType !== 'systemEventMessage'"
//                 class="teams-content teams-reply"
//               >
//                 <div class="teams-message-reply-author-avatar">
//                   <mgt-person
//                     user-id="{{from.user.id}}"
//                     avatar-size="large"
//                     view="avatar"
//                     person-card="hover"
//                     show-presence="true"
//                     class="mgt-person-medium"
//                   >
//                   </mgt-person>
//                 </div>
//                 <div class="teams-message-reply">
//                   <mgt-person id="mgt-person-author" user-id="{{from.user.id}}">
//                     <template type="default">
//                       <span class="teams-message-author-title"
//                         >{{ person.displayName }}
//                       </span>
//                       <span class="teams-message-date"
//                         >{{ formatDate($parent.lastModifiedDateTime)}}</span
//                       >
//                     </template>
//                   </mgt-person>
//                   <div data-props="innerHTML: body.content"></div>
//                 </div>
//               </div>
//             </template>
//           </mgt-get>
//         </div>
//       </div>
//     </template>
//     <template data-type="loading">
//       <fluent-progress-ring></fluent-progress-ring>
//     </template>
//   </mgt-get>
