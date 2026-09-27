package routes

import (
	"net/http"
	"fmt"
)


func Login() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
			return
		}

		username := r.FormValue("username")

		password := r.FormValue("password")

		fmt.Println("Login: " + username + " " + password);

	}
}