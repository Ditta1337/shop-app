// Original file: server/proto/user.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

// Original file: server/proto/user.proto

export const _pb_User_Role = {
  user: 0,
  admin: 1,
} as const;

export type _pb_User_Role =
  | 'user'
  | 0
  | 'admin'
  | 1

export type _pb_User_Role__Output = typeof _pb_User_Role[keyof typeof _pb_User_Role]

export interface User {
  'Id'?: (string);
  'Email'?: (string);
  'Password'?: (string);
  'Token'?: (string);
  'VerificationCode'?: (string);
  'CreatedAt'?: (_google_protobuf_Timestamp | null);
  'UpdatedAt'?: (_google_protobuf_Timestamp | null);
}

export interface User__Output {
  'Id'?: (string);
  'Email'?: (string);
  'Password'?: (string);
  'Token'?: (string);
  'VerificationCode'?: (string);
  'CreatedAt'?: (_google_protobuf_Timestamp__Output);
  'UpdatedAt'?: (_google_protobuf_Timestamp__Output);
}
