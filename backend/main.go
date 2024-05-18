package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"database/sql"
	"log"	
	"github.com/dekopon21020014/chouseisan-kai/backend/event"
	_ "github.com/mattn/go-sqlite3"
)

func setupDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("sqlite3", dsn)
	if err != nil {
		return nil, err
	}

	queries := []string{
		`CREATE TABLE IF NOT EXISTS events(id INTEGER, description TEXT, PRIMARY KEY (id))`,
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
	router.Run()
}