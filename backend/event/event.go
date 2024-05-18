package event

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
)

func Create(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.PostForm("name")
		description := c.PostForm("description")
		fmt.Println("=================================")
		fmt.Printf("name = %s\ndescription=%s\n", name, description)
		fmt.Println("=================================")
	}
}

