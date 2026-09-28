package routes

import (
	"net/http"
	"fmt"
	"encoding/json"
)


func SendFriendRequest() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
			return
		}

		username := r.FormValue("username")

		senderUserID := r.FormValue("senderUserID")

		fmt.Println("Friend request to: " + username + " from: " + senderUserID);

		//find userID from username and add senderUserID to (userID/username) request list

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode("success")

	}
}