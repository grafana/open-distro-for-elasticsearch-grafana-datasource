# Open Distro for Elasticsearch Data Source Development Guide

## Development

`$ docker-compose up` starts a single node odfe cluster & kibana

If cluster not starting with error `max virtual memory areas vm.max_map_count [65530] is too low...`, increase mmap limits by running as root:

```
sysctl -w vm.max_map_count=262144
```

### Datasource Configuration

URL: https://localhost:9200
Basic Auth: `admin:admin`
Skip TLS Verify: `true`

### TODO: Fake Data gen
