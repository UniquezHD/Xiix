package main

import (
	"fmt"
	"main/routes"
	"net/http"
	"log"
	"github.com/doquangtan/socketio/v4"
)

func main() {
	io := socketio.New()

	io.OnConnection(func(socket *socketio.Socket) {
		fmt.Println("Connected: " + socket.Id)

		socket.On("friends-get-list", func(event *socketio.EventPayload) {
			fmt.Println("friends-get-list")
		})

		socket.On("friends-get-list-requests", func(event *socketio.EventPayload) {
			fmt.Println("friends-get-list-requests")
		})

		socket.On("friends-add-friend", func(event *socketio.EventPayload) {
			fmt.Println("friends-add-friend")
		})

		socket.On("friends-delete-friend", func(event *socketio.EventPayload) {
			fmt.Println("friends-delete-friend")
		})

		socket.On("disconnect", func(event *socketio.EventPayload) {
			fmt.Println("Disconnected: " + socket.Id)
		})
	})

	http.Handle("/api/friends/get/list", http.HandlerFunc(routes.GetFriendList()))

	http.Handle("/api/login", http.HandlerFunc(routes.Login()))

	log.Println("Server running at http://localhost:3001")

	http.Handle("/", io.HttpHandler())
	log.Fatal(http.ListenAndServe("127.0.0.1:3001", nil))
}

