package event

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Create(db *sql.DB) gin.HandlerFunc {
	type RequestData struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}

	return func(c *gin.Context) {
		var requestData RequestData
		if err := c.ShouldBindJSON(&requestData); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }		

		fmt.Println("=================================")
		fmt.Printf("name = %s\ndescription=%s\n", requestData.Name, requestData.Description)
		fmt.Println("=================================")
	}
}

