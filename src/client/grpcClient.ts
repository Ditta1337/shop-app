import * as grpc from '@grpc/grpc-js';
import path from 'path';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../generated/authService';
import { LogInUserInput } from '../generated/pb/LogInUserInput';

const PROTO_PATH = '../server/proto';
const PORT = 50051;

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, PROTO_PATH))
const grpcObject = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

export const client = new grpcObject.pb.AuthService(`localhost:${PORT}`, grpc.credentials.createInsecure());

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 10);

client.waitForReady(deadline, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('connected');
  }
});

    
export function LogInUserFunc(email: string, password: string) {
  client.LogInUser({email, password}, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(response);
    }
  });
}
  
