package main

import (
	"github.com/grafana/es-open-distro-datasource/pkg/elasticsearch"
	"github.com/grafana/grafana-plugin-sdk-go/backend/datasource"
)

// newDatasource returns datasource.ServeOpts.
func newDatasource() datasource.ServeOpts {
	// creates a instance manager for your plugin. The function passed
	// into `NewInstanceManger` is called when the instance is created
	// for the first time or when a datasource configuration changed.
	// im := datasource.NewInstanceManager(newDataSourceInstance)
	ds := elasticsearch.NewElasticsearchDatasource()

	return datasource.ServeOpts{
		QueryDataHandler:   ds,
		CheckHealthHandler: ds,
	}
}
