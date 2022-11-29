declare type UserPayload = {
  userId: number;
  openid: string;
  nickName?: string;
};

declare type AdminPayload = {
  username: string;
  userId: number;
  role: number;
};
