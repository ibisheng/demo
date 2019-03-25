package main

import (
	"fmt"
)

const (
	OK = iota << 1
	LOGIN_PASSWORD_ERROR
	USERNAME_EXIST
	USERNAME_NO_EXIST
	INPUT_ERROR
	SERVER_ERROR
)

func main() {
	fmt.Println(OK)
	fmt.Println(LOGIN_PASSWORD_ERROR)
	fmt.Println(USERNAME_EXIST)
	fmt.Println(USERNAME_NO_EXIST)
	fmt.Println(INPUT_ERROR)
	fmt.Println(SERVER_ERROR)
}
