package utils

import (
	"encoding/json"

	"github.com/bitly/go-simplejson"
)

func NewJsonFromAny(data interface{}) *simplejson.Json {
	dataByte, _ := json.Marshal(data)
	dataJson, _ := simplejson.NewJson(dataByte)
	return dataJson
}
