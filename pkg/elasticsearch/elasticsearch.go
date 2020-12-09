package elasticsearch

import (
	"context"
	"fmt"

	es "github.com/grafana/es-open-distro-datasource/pkg/elasticsearch/client"
	"github.com/grafana/es-open-distro-datasource/pkg/tsdb"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
)

// ElasticsearchExecutor represents a handler for handling elasticsearch datasource request
type ElasticsearchExecutor struct{}

type ElasticsearchDatasource struct {
	// The instance manager can help with lifecycle management
	// of datasource instances in plugins. It's not a requirements
	// but a best practice that we recommend that you follow.
	im instancemgmt.InstanceManager
}

var (
	intervalCalculator tsdb.IntervalCalculator
)

type TsdbQueryEndpoint interface {
	Query(ctx context.Context, ds *backend.DataSourceInstanceSettings, query *tsdb.TsdbQuery) (*tsdb.Response, error)
}

// NewElasticsearchExecutor creates a new elasticsearch executor
func NewElasticsearchExecutor(dsInfo *backend.DataSourceInstanceSettings) (TsdbQueryEndpoint, error) {
	return &ElasticsearchExecutor{}, nil
}

func init() {
	intervalCalculator = tsdb.NewIntervalCalculator(nil)
	// tsdb.RegisterTsdbQueryEndpoint("elasticsearch", NewElasticsearchExecutor)
}

// Query handles an elasticsearch datasource request
func (e *ElasticsearchExecutor) Query(ctx context.Context, dsInfo *backend.DataSourceInstanceSettings, tsdbQuery *tsdb.TsdbQuery) (*tsdb.Response, error) {
	if len(tsdbQuery.Queries) == 0 {
		return nil, fmt.Errorf("query contains no queries")
	}

	client, err := es.NewClient(ctx, dsInfo, tsdbQuery.TimeRange)
	if err != nil {
		return nil, err
	}

	if tsdbQuery.Debug {
		client.EnableDebug()
	}

	query := newTimeSeriesQuery(client, tsdbQuery, intervalCalculator)
	return query.execute()
}
