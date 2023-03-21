/** @format */

export type UserToken = {
  expiresOn: number;
  identity: string;
  token: string;
};

/**
 * This is implemented by contoso and passed to createAzureCommunicationChatAdapter
 */
export const getToken = async (): Promise<UserToken> => {
  const getTokenRequestOptions = {
    method: "POST",
    body: JSON.stringify({
      client_id: "7dfd9b20-0b4c-49b2-a31b-30faa362bfe0",
      client_secret: "sdL8Q~9HlXA.YpTudQg9li4D3Rp4pPQCouNpVb7N",
      grant_type: "client_credentials",
      scope: "https://graph.microsoft.com/.default",
    }),
  };
  const getTokenResponse = await fetch(
    "https://login.microsoftonline.com/b7e28bed-bd9b-44e2-8236-ffb159f2634c/oauth2/v2.0/token",
    getTokenRequestOptions
  );
  const responseJson = await getTokenResponse.json();
  return {
    expiresOn: responseJson.expiresOn,
    identity: responseJson.user.communicationUserId,
    token: responseJson.token,
  };
};

/**
 *
 * The token is extracted from the url
 * using URLsearchparams.
 *
 * @returns The token as String
 *
 */

export const getExistingTokenFromURL = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  return token;
};
