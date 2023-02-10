// Original file: server/proto/authService.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GenericResponse as _pb_GenericResponse, GenericResponse__Output as _pb_GenericResponse__Output } from '../pb/GenericResponse';
import type { LogInUserInput as _pb_LogInUserInput, LogInUserInput__Output as _pb_LogInUserInput__Output } from '../pb/LogInUserInput';
import type { LogInUserResponse as _pb_LogInUserResponse, LogInUserResponse__Output as _pb_LogInUserResponse__Output } from '../pb/LogInUserResponse';
import type { SignUpUserInput as _pb_SignUpUserInput, SignUpUserInput__Output as _pb_SignUpUserInput__Output } from '../pb/SignUpUserInput';
import type { VerifyEmailRequest as _pb_VerifyEmailRequest, VerifyEmailRequest__Output as _pb_VerifyEmailRequest__Output } from '../pb/VerifyEmailRequest';

export interface AuthServiceClient extends grpc.Client {
  LogInUser(argument: _pb_LogInUserInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_LogInUserResponse__Output>): grpc.ClientUnaryCall;
  LogInUser(argument: _pb_LogInUserInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_pb_LogInUserResponse__Output>): grpc.ClientUnaryCall;
  LogInUser(argument: _pb_LogInUserInput, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_LogInUserResponse__Output>): grpc.ClientUnaryCall;
  LogInUser(argument: _pb_LogInUserInput, callback: grpc.requestCallback<_pb_LogInUserResponse__Output>): grpc.ClientUnaryCall;
  logInUser(argument: _pb_LogInUserInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_LogInUserResponse__Output>): grpc.ClientUnaryCall;
  logInUser(argument: _pb_LogInUserInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_pb_LogInUserResponse__Output>): grpc.ClientUnaryCall;
  logInUser(argument: _pb_LogInUserInput, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_LogInUserResponse__Output>): grpc.ClientUnaryCall;
  logInUser(argument: _pb_LogInUserInput, callback: grpc.requestCallback<_pb_LogInUserResponse__Output>): grpc.ClientUnaryCall;
  
  SignUpUser(argument: _pb_SignUpUserInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  SignUpUser(argument: _pb_SignUpUserInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  SignUpUser(argument: _pb_SignUpUserInput, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  SignUpUser(argument: _pb_SignUpUserInput, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  signUpUser(argument: _pb_SignUpUserInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  signUpUser(argument: _pb_SignUpUserInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  signUpUser(argument: _pb_SignUpUserInput, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  signUpUser(argument: _pb_SignUpUserInput, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  
  VerifyEmail(argument: _pb_VerifyEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _pb_VerifyEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _pb_VerifyEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _pb_VerifyEmailRequest, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _pb_VerifyEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _pb_VerifyEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _pb_VerifyEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _pb_VerifyEmailRequest, callback: grpc.requestCallback<_pb_GenericResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  LogInUser: grpc.handleUnaryCall<_pb_LogInUserInput__Output, _pb_LogInUserResponse>;
  
  SignUpUser: grpc.handleUnaryCall<_pb_SignUpUserInput__Output, _pb_GenericResponse>;
  
  VerifyEmail: grpc.handleUnaryCall<_pb_VerifyEmailRequest__Output, _pb_GenericResponse>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  LogInUser: MethodDefinition<_pb_LogInUserInput, _pb_LogInUserResponse, _pb_LogInUserInput__Output, _pb_LogInUserResponse__Output>
  SignUpUser: MethodDefinition<_pb_SignUpUserInput, _pb_GenericResponse, _pb_SignUpUserInput__Output, _pb_GenericResponse__Output>
  VerifyEmail: MethodDefinition<_pb_VerifyEmailRequest, _pb_GenericResponse, _pb_VerifyEmailRequest__Output, _pb_GenericResponse__Output>
}
