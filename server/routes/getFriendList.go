package routes

import (
	"net/http"
	"fmt"
)


func GetFriendList() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
			return
		}

		userID := r.FormValue("userID")

		fmt.Println("UserID: " + userID);

		// get friendlist for user

	}
}