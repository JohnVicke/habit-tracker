/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("@ht/auth").Auth;
  type DatabaseUserAttributes = {
    username: string;
  }
  type DatabaseSessionAttributes = {};
}
