package main

import (
	"database/sql"
	"github.com/dekopon21020014/chouseisan-kai/backend/event"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"log"
)

func setupDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("sqlite3", dsn)
	if err != nil {
		return nil, err
	}

	queries := []string{
		`CREATE TABLE IF NOT EXISTS events(
			id INTEGER PRIMARY KEY AUTOINCREMENT, 
			name TEXT, 
			description TEXT
		)`,
	}
	for _, query := range queries {
		_, err = db.Exec(query)
		if err != nil {
			return nil, err
		}
	}
	return db, nil
}

func main() {
	db, err := setupDB("dtabase.sqlite")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	router := gin.Default()
	router.Use(cors.Default()) // 一旦，どのドメインからでも許可

	router.POST("/events", event.Create(db))
	router.GET("/events", event.GetAllEvents(db))
	router.Run()
}
