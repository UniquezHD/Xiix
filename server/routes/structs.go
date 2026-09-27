package routes

type FriendList struct {
	User       int    `json:"user"`
	FriendList []User `json:"friendlist"`
}

type User struct {
	UserID         int    `json:"userID"`
	Username       string `json:"username"`
	Activity       string `json:"activity"`
	ProfilePicture string `json:"profilePicture"`
	OnlineStatus   bool `json:"onlineStatus"`
}

type LoginCredentials struct {
	Username string `json:username`
	Password string `json:password`
}
