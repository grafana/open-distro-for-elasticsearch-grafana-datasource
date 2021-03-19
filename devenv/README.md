# Open Distro for Elasticsearch dev environment

## Running test Open Distro instance

### Run docker env

`$ docker-compose up` starts a single node odfe cluster & kibana

If cluster not starting with error `max virtual memory areas vm.max_map_count [65530] is too low...`, increase mmap limits by running as root:

```
sysctl -w vm.max_map_count=262144
```

### Add sample data

1. Go to the kibana (http://localhost:5601)
1. Login with `admin:admin`
1. At the welcome screen click _Add data_ and switch to the _Sample data_ tab.
1. Import _Sample web logs_ and any other by your choice.

## Data source configuration

URL: https://localhost:9200
Basic Auth: `admin:admin`
Skip TLS Verify: `true`

### TODO: Fake Data gen
