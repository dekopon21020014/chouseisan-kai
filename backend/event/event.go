package event

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"log"
)

type Event struct {
	ID int
	Name string `json:"name"`
	Description string `json:"description"`
}

func addEntry(db *sql.DB, event *Event) error{
	_, err := db.Exec(`
        INSERT INTO events(name, description) values(?, ?)
    `,
		event.Name,
		event.Description,
	)
	if err != nil {
		return err
	}
	return nil
}

// 一時的に標準出力に出す関数(開発用)
func all(db *sql.DB) {
	rows, err := db.Query("SELECT * FROM events")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// 取得したデータを処理
	for rows.Next() {
		var event Event
		if err := rows.Scan(&event.ID, &event.Name, &event.Description); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("Name: %s, Description: %s\n", event.Name, event.Description)
	}
}

func Create(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		var event Event
		if err := c.ShouldBindJSON(&event); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
		
		if err := addEntry(db, &event); err != nil {
			log.Fatal(err)
		}
		c.JSON(200, event)

		fmt.Println("=================================")
		fmt.Printf("name = %s\ndescription=%s\n", event.Name, event.Description)
		fmt.Println("=================================")
		all(db)
	}
}

func GetAllEvents(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		rows, err := db.Query("SELECT * FROM events")
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		var events []Event
		for rows.Next() {
			var event Event
			if err := rows.Scan(&event.ID, &event.Name, &event.Description); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			events = append(events, event)
		}
		if err := rows.Err(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, events)
		log.Println(events)
	}	
}