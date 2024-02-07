export const getCognitoUserId = async () => {
    console.log("<authServices>: getCognitoUserId(): Executing getCognitoUserId() ...");
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      console.log("<authServices>: getCognitoUserId(): Cognito user info: ", userInfo.attributes.sub);
      return userInfo.attributes.sub;
    } catch (error) {
      console.error("<authServices>: getCognitoUserId(): Error retrieving user info:", error);
    }
  }