export enum ENUM_PROVIDER {
  LOCAL = "LOCAL",
  NAVER = "NAVER",
  KAKAO = "KAKAO",
}

export const userResponse = {
  user_id: true,
  email: true,
  provider: true,
  created_at: true,
};

export interface IUserSession {
  user_id: number;
  email: string;
  provider: ENUM_PROVIDER;
  created_at: string;
}

export interface IKakaoInfo {
  id: number;
  connected_at: string;
  kakao_account: {
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}
export interface INaverInfo {
  resultcode: string;
  message: string;
  response: {
    id: string;
    email: string;
  };
}

const kakaoToken = {
  access_token: "ANLez6wNAwqwjzkA7PbKHBIWUQ3PJ1yyKza1yqncCilv1QAAAYJI74DN",
  token_type: "bearer",
  refresh_token: "DIVCf29TQmnGZTh9E5OLLL5PoWeG4thJZxYIknocCilv1QAAAYJI74DM",
  id_token:
    "eyJraWQiOiI5ZjI1MmRhZGQ1ZjIzM2Y5M2QyZmE1MjhkMTJmZWEiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwYjVkNDBjYzExZWNhODI5OTE1ODdjYmQ3Nzc0NTMzZCIsInN1YiI6IjIzNTMzMDAyOTkiLCJhdXRoX3RpbWUiOjE2NTkwODEwMzEsImlzcyI6Imh0dHBzOi8va2F1dGgua2FrYW8uY29tIiwiZXhwIjoxNjU5MDg4MjMxLCJpYXQiOjE2NTkwODEwMzF9.YFft4dgnqDKd-cL2hFeLJ10VqTA-nWwmxpNEXtKB5GMwDusN8Ff1lxBiZdOVLd0SnN4cq7nZm6aj3IDNMUs7ygtjdKFVdEGEzKOFbMbHHA6-DI2poA0naX-oKPsJy_LL_Ofg3APktTLfgKAJHJP3z4qTzG1ADAwDJdxRrudUMm3SIIymqs76f9XoIQ5KM40ahlR-uC58ibk-DbC4Lzhxkbm4FvCNNyTeFF5ecmqJrsMbObBlFbX665EkYAiHZuuj00MqYR0jlCOZQBfQcL5k28za7vZR3WmB90tcFjP4xwrsEJ5UzZMPnbNd6fNeW92jSez5bk6we43RHvANuPD9aw",
  expires_in: 7199,
  scope: "account_email openid",
  refresh_token_expires_in: 5183999,
};
const kakaoTokenInfo = {
  id: 2353300299,
  connected_at: "2022-07-29T07:50:32Z",
  kakao_account: {
    has_email: true,
    email_needs_agreement: false,
    is_email_valid: true,
    is_email_verified: true,
    email: "yongsoocho@naver.com",
  },
};
const naverToken = {
  access_token:
    "AAAAO_bHJGM5ju4Z-QHRSV5Zb15dc5Cy3Oyk0RjvcE149jC7mc46_JsvBXbjL1tB_D6J4b9XLXN6bDPUrBjuoFryrF0",
  expires_in: "3600",
  state: "dd440b09-4c50-464d-8d69-5ab482a0a2b8",
  token_type: "bearer",
};
const naverTokenInfo = {
  resultcode: "00",
  message: "success",
  response: {
    id: "ddvU_tQFXEHpujzuts1HrGBw6p0KstsgZH5o7qNK1X4",
    email: "yongsoocho@naver.com",
  },
};
