import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthServiceClient as _pb_AuthServiceClient, AuthServiceDefinition as _pb_AuthServiceDefinition } from './pb/AuthService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
  pb: {
    AuthService: SubtypeConstructor<typeof grpc.Client, _pb_AuthServiceClient> & { service: _pb_AuthServiceDefinition }
    GenericResponse: MessageTypeDefinition
    LogInUserInput: MessageTypeDefinition
    LogInUserResponse: MessageTypeDefinition
    SignUpUserInput: MessageTypeDefinition
    SignUpUserResponse: MessageTypeDefinition
    User: MessageTypeDefinition
    VerifyEmailRequest: MessageTypeDefinition
  }
}

