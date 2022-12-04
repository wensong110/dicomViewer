package main

import (
	"net/url"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CreateStaticHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		file := c.Request.URL.String()
		file, _ = url.QueryUnescape(file)
		if strings.Contains(file, "local") {
			c.File("./dist/index.html")
			c.Abort()
			return
		}
		c.Next()
	}
}

func main() {
	// 1.创建路由
	r := gin.Default()
	// 2.绑定路由规则，执行的函数
	// gin.Context，封装了request和response
	r.Use(cors.Default())
	r.Use(CreateStaticHandler())
	r.Static("/", "./dist/")
	// 3.监听端口，默认在8080
	// Run("里面不指定端口号默认为8080")
	r.Run(":8000")
}
