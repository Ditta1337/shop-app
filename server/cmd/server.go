package main

import (
	"context"
	"log"
	"net"

	"github.com/Ditta1337/shop-app/server/database"
	"github.com/Ditta1337/shop-app/server/jwt"
	"github.com/Ditta1337/shop-app/server/proto"
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type authServiceServer struct{}

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
	// create user in database
	user := &pb.User{
		Email:    in.Email,
		Password: string(hashedPassword),
		Role:     pb.User_user,
	}
	if err := database.CreateUser(user); err != nil {
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
	user, err := database.GetUserByVerificationCode(in.VerificationCode)
	if err != nil {
		return nil, status.Error(codes.NotFound, "Verification code not found")
	}
	// generate JWT
	token := jwt.GenerateJWT(user)
	// update user with JWT
	user.Token = token
	if err := database.UpdateUser(user); err != nil {
		return nil, status.Error(codes.Internal, "Error updating user with JWT")
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
	pb.RegisterAuthServiceServer(s, &authServiceServer{})
	// start gRPC server
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
