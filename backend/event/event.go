package event

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"log"
	"strconv"
	"strings"
)

type Event struct {
	ID int
	Name string `json:"name"`
	Description string `json:"description"`
	Options string `json:"options"`
}

type Option struct {
	ID int
	EventId int
	Item string
}

func addEntry(db *sql.DB, event *Event) error{
	res, err := db.Exec(`
        INSERT INTO events(name, description) values(?, ?)
    `,
		event.Name,
		event.Description,
	)	
	if err != nil {
		return err
	}

	eventID, err := res.LastInsertId()
	if err != nil {
		return err
	}

	options := strings.Split(event.Options, "\n")
	for i, option := range options {
		options[i] = strings.TrimSpace(option)
	}

	for _, option := range options {
		if option == "" {
			continue
		}
		_, err := db.Exec(`
			INSERT INTO options(event_id, item) values(?, ?)
		`,
			eventID,
			option,
		)
		if err != nil {
			return err
		}
	}

	return nil
}

func Create(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		var event Event
		if err := c.ShouldBindJSON(&event); err != nil {
			fmt.Printf("can't bind event as json\n")
			log.Print(err)
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

		if err := addEntry(db, &event); err != nil {
			log.Fatal(err)
		}
		c.JSON(200, event)
	}
}

func GetAllEvents(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		rows, err := db.Query("SELECT * FROM events")
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		//  Event
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
	}	
}

func GetEvent(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var event struct{
			ID int
			Name string `json:"name"`
			Description string `json:"description"`
			Options []string `json:"options"`			
		}

		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
			log.Fatal(err)
			return
		}

		eventRow := db.QueryRow("SELECT * FROM events WHERE id=?", id)
		err = eventRow.Scan(&event.ID, &event.Name, &event.Description, )

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch event"})
			return
		}

		optionRows, err := db.Query("SELECT * FROM options WHERE event_id=?", id)
		if err != nil {
			log.Fatal(err)
		}
		defer optionRows.Close()

		var options []string
		for optionRows.Next() {
			var (
				id int
				eventId int
				item string
			)
			if err := optionRows.Scan(&id, &eventId, &item); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			options = append(options, item)
		}
		if err := optionRows.Err(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		event.Options = options;

		c.JSON(http.StatusOK, event)
	}
}

// dbの内容を一時的に標準出力に出す関数(開発用)
func all(db *sql.DB) {
	fmt.Println("===========events===================")
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

	fmt.Println("===========options===================")
	rows, err = db.Query("SELECT * FROM options")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// 取得したデータを処理
	for rows.Next() {
		var option Option
		if err := rows.Scan(&option.ID, &option.EventId, &option.Item); err != nil {
			log.Fatal(err)
		}		
	}
}