package database

import (
	"database/sql"
	"log"

	pb "example.com/m/pb"
	_ "github.com/mattn/go-sqlite3"
)

// DB represents the SQLite database
var DB *sql.DB


func GetUserByVerificationCode(verificationCode string) (*pb.User, error) {
	var user pb.User
	err := DB.QueryRow(`
		SELECT id, email, password, token FROM users WHERE verification_code = ?
	`, verificationCode).Scan(&user.Id, &user.Email, &user.Password, &user.Token)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func GetUserByEmail(email string) (*pb.User, error) {
	var user pb.User
	err := DB.QueryRow(`
		SELECT id, email, password, token FROM users WHERE email = ?
	`, email).Scan(&user.Id, &user.Email, &user.Password, &user.Token)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func UpdateUserToken(user *pb.User) error {
	_, err := DB.Exec(`
		UPDATE users SET token = ? WHERE id = ?
	`, user.Token, user.Id)
	return err
}

func UpdateUserUpdatedAt(user *pb.User) error {
	_, err := DB.Exec(`
		UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?
	`, user.Id)
	return err
}

func CreateUser(user *pb.User) error {
	_, err := DB.Exec(`
		INSERT INTO users (email, password, token, verification_code) VALUES (?, ?, ?, ?)
	`, user.Email, user.Password, user.Token, user.VerificationCode)
	return err
}

func init() {
	var err error
	DB, err = sql.Open("sqlite3", "./auth.db")
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	_, err = DB.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			email TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL,
			token TEXT,
			verification_code TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		log.Fatalf("Error creating table: %v", err)
	}
}
