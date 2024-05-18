package main

import (
	"github.com/gin-gonic/gin"
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "database.sqlite")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	router := gin.Default()		
	router.Run()
}