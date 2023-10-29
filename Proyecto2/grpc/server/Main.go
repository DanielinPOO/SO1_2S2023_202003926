package main

import (
	"context"
	"fmt"
	pb "golangSocket/grpc-server"
	"log"
	"net"
	"strconv"

	"github.com/redis/go-redis/v9"
	"google.golang.org/grpc"
)

var ctx = context.Background()
var rdb *redis.Client

type server struct {
	pb.UnimplementedGetInfoServer
}

const (
	port = ":3001"
)

type Data struct {
	Carnet   string
	Nombre   string
	Curso    string
	Nota     string
	Semestre string
	Year     string
}

func redisConnect() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       15,
	})

	pong, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(pong)
}

func (s *server) ReturnInfo(ctx context.Context, in *pb.RequestId) (*pb.ReplyInfo, error) {
	fmt.Println("Recibí de cliente: ", in.GetCarnet())
	data := Data{
		Carnet:   in.GetCarnet(),
		Nombre:   in.GetNombre(),
		Curso:    in.GetCurso(),
		Nota:     in.GetNota(),
		Semestre: in.GetSemestre(),
		Year:     in.GetYear(),
	}
	insertRedis(data)
	return &pb.ReplyInfo{Info: "Hola cliente, recibí el comentario"}, nil
}

func insertRedis(rank Data) {
	array := rank.Carnet + "-" + rank.Year
	ranked, _ := strconv.ParseFloat(rank.Nombre, 64)

	rdb.ZAddArgsIncr(ctx, array, redis.ZAddArgs{
		XX:      false,
		NX:      true,
		Members: []redis.Z{{Score: ranked, Member: rank.Curso}},
	})

	key := array + "-" + rank.Curso
	rdb.HIncrBy(ctx, key, rank.Nombre, 1)
}

//func getData(c *fiber.Ctx) error {
//	key := c.Params("key")
//
//	dataRet, _ := rdb.HGetAll(ctx, key).Result()
//	return c.JSON(fiber.Map{
//		"res": dataRet,
//	})
//}

func main() {
	listen, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalln(err)
	}
	s := grpc.NewServer()
	pb.RegisterGetInfoServer(s, &server{})

	redisConnect()

	if err := s.Serve(listen); err != nil {
		log.Fatalln(err)
	}
}
