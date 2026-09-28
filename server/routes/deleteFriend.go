package routes

import (
	"net/http"
	"fmt"
	"encoding/json"
)


func DeleteFriend() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
			return
		}

		username := r.FormValue("username")

		userID := r.FormValue("userID")

		fmt.Println("Delete: " + username + " from: " + userID);

		//find user from username and remove from frinedlist of userID

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode("success")

	}
}