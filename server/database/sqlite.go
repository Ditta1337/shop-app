package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// DB represents the SQLite database
var DB *sql.DB

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
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		log.Fatalf("Error creating table: %v", err)
	}
}
