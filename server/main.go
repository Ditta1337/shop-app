package main

import (
	"fmt"
	"context"
	"log"
	"net"

	jwt "example.com/m/auth"
	db "example.com/m/database"
	pb "example.com/m/pb"

	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/reflection"
	"google.golang.org/grpc/status"
)

type authServiceServer struct{
	pb.UnimplementedAuthServiceServer
}


func (s *authServiceServer) LogInUser (ctx context.Context, in *pb.LogInUserInput) (*pb.LogInUserResponse, error) {
	// validate input data
	if in.Email == "" {
		return nil, status.Error(codes.InvalidArgument, "Email is required")
	}
	if in.Password == "" {
		return nil, status.Error(codes.InvalidArgument, "Password is required")
	}
	// get user from database
	user, err := db.GetUserByEmail(in.Email)
	if err != nil {
		return nil, status.Error(codes.NotFound, "User not found")
	}

	// check if user is verified
	if user.Token == "" {
		return nil, status.Error(codes.Unauthenticated, "Email not verified")
	}
	// generate JWT token
	token, err := jwt.GenerateToken(user)
	if err != nil {
		return nil, status.Error(codes.Unavailable, "Error generating JWT token")
	}
	// update token
	user.Token = token
	// udate user in database
	if err := db.UpdateUserToken(user); err != nil {
		return nil, status.Error(codes.Internal, "Error updating user with JWT token")
	}

	if err := db.UpdateUserUpdatedAt(user); err != nil {
		fmt.Println("Error updating user with updated_at:", err)
		return nil, status.Error(codes.Internal, "Error updating user with updated_at")
	}


	// compare password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(in.Password)); err != nil {
		return nil, status.Error(codes.InvalidArgument, "Incorrect password")
	}
	
	// generate response
	return &pb.LogInUserResponse{
		Email: user.Email,
		Token: user.Token,
	}, nil
}


func (s *authServiceServer) SignUpUser(ctx context.Context, in *pb.SignUpUserInput) (*pb.GenericResponse, error) {
	// validate input data
	if in.Password != in.PasswordConfirm {
		return nil, status.Error(codes.InvalidArgument, "Password and Confirm Password do not match")
	}
	// hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(in.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, status.Error(codes.Internal, "Error hashing password")
	}

	// generate verification code
	verificationCode, err := jwt.GenerateVerificationCode()
	if err != nil {
		return nil, status.Error(codes.Internal, "Error generating verification code")
	}

	// create user in database
	user := &pb.User{
		Email:    in.Email,
		Password: string(hashedPassword),
		Token:	"",
		VerificationCode: verificationCode,
	}
	if err := db.CreateUser(user); err != nil {
		return nil, status.Error(codes.Internal, "Error creating user")
	}
	// generate response
	return &pb.GenericResponse{
		Status:  "success",
		Message: "User created successfully",
	}, nil
}


func (s *authServiceServer) VerifyEmail(ctx context.Context, in *pb.VerifyEmailRequest) (*pb.GenericResponse, error) {
	// verify email
	user, err := db.GetUserByVerificationCode(in.VerificationCode)
	if err != nil {
		return nil, status.Error(codes.NotFound, "Verification code not found")
	}
	// generate JWT token
	token, err := jwt.GenerateToken(user)
	if err != nil {
		return nil, status.Error(codes.Internal, "Error generating JWT token")
	}
	// update token
	user.Token = token

	if err := db.UpdateUserToken(user); err != nil {
		return nil, status.Error(codes.Internal, "Error updating user with JWT token")
	}
	// generate response
	return &pb.GenericResponse{
		Status:  "success",
		Message: "Email verified successfully",
	}, nil
}

func main() {
	// create listener
	lis, err := net.Listen("tcp", "0.0.0.0:50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}	
	// create gRPC server
	s := grpc.NewServer()

	// register reflection service on gRPC server
	reflection.Register(s)
	// register service
	pb.RegisterAuthServiceServer(s, &authServiceServer{})
	// start gRPC server
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
