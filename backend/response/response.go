package response

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Response struct {
	ID       int
	EventId  int
	OptionId int
	User     string
}

func Put(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, "success")
	}
}
