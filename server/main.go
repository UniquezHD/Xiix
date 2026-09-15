package main

import (
	"fmt"
	"net/http"
	"github.com/doquangtan/socketio/v4"
)

func main() {
	io := socketio.New()

	io.OnConnection(func(socket *socketio.Socket) {
		fmt.Println("Connected: " + socket.Id)

		socket.On("disconnect", func(event *socketio.EventPayload) {
			fmt.Println("Disconnected: " + socket.Id)
		})
	})

	io.Of("friend-list").OnConnection(func(socket *socketio.Socket) {
		fmt.Println("/friend-list")
	})

	http.Handle("/", io.HttpHandler())
	http.ListenAndServe(":3001", nil)
}
