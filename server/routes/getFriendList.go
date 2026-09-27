package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
)

func GetFriendList() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
			return
		}

		userID := r.FormValue("userID")

		fmt.Println("UserID: " + userID)

		id, err := strconv.Atoi(userID)
		if err != nil {
			return
		}

		file, err := os.Open("json/friendLists.json")
		if err != nil {
			fmt.Println(err)
		}
		defer file.Close()

		var friendlist []FriendList
		if err := json.NewDecoder(file).Decode(&friendlist); err != nil {
			fmt.Println(err)
		}

		var result *FriendList
		for _, item := range friendlist {
			if item.User == id {
				result = &item
				break
			}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(result)
	}
}
