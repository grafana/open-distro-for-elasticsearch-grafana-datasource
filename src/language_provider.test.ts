import LanguageProvider from './language_provider';
// import { PromQuery } from '../prometheus/types';
import { ElasticDatasource } from './datasource';
import { DataSourceInstanceSettings } from '@grafana/data';
import { ElasticsearchOptions, PromQuery } from './types';

jest.mock('@grafana/runtime', () => ({
  ...((jest.requireActual('@grafana/runtime') as unknown) as object),
  getTimeSrv: () => ({
    getAdhocFilters: jest.fn(() => [] as any[]),
    replace: jest.fn((a: string) => a),
  }),
}));

const dataSource = new ElasticDatasource({
  url: 'http://es.com',
  database: '[asd-]YYYY.MM.DD',
  jsonData: {
    interval: 'Daily',
    esVersion: 2,
    timeField: '@time',
  },
} as DataSourceInstanceSettings<ElasticsearchOptions>);
describe('transform prometheus query to elasticsearch query', () => {
  it('Prometheus query with exact equals labels ( 2 labels ) and metric __name__', () => {
    const instance = new LanguageProvider(dataSource);
    var promQuery: PromQuery = { refId: 'bar', expr: 'my_metric{label1="value1",label2="value2"}' };
    const result = instance.importQueries([promQuery], 'prometheus');
    expect(result).toEqual([
      { isLogsQuery: true, query: '__name__:"my_metric" AND label1:"value1" AND label2:"value2"', refId: 'bar' },
    ]);
  });
  it('Prometheus query with exact equals labels ( 1 labels ) and metric __name__', () => {
    const instance = new LanguageProvider(dataSource);
    var promQuery: PromQuery = { refId: 'bar', expr: 'my_metric{label1="value1"}' };
    const result = instance.importQueries([promQuery], 'prometheus');
    expect(result).toEqual([{ isLogsQuery: true, query: '__name__:"my_metric" AND label1:"value1"', refId: 'bar' }]);
  });
  it('Prometheus query with exact equals labels ( 1 labels )', () => {
    const instance = new LanguageProvider(dataSource);
    var promQuery: PromQuery = { refId: 'bar', expr: '{label1="value1"}' };
    const result = instance.importQueries([promQuery], 'prometheus');
    expect(result).toEqual([{ isLogsQuery: true, query: 'label1:"value1"', refId: 'bar' }]);
  });
  it('Prometheus query with no label and metric __name__', () => {
    const instance = new LanguageProvider(dataSource);
    var promQuery: PromQuery = { refId: 'bar', expr: 'my_metric{}' };
    const result = instance.importQueries([promQuery], 'prometheus');
    expect(result).toEqual([{ isLogsQuery: true, query: '__name__:"my_metric"', refId: 'bar' }]);
  });
  it('Prometheus query with no label and metric __name__ without bracket', () => {
    const instance = new LanguageProvider(dataSource);
    var promQuery: PromQuery = { refId: 'bar', expr: 'my_metric' };
    const result = instance.importQueries([promQuery], 'prometheus');
    expect(result).toEqual([{ isLogsQuery: true, query: '__name__:"my_metric"', refId: 'bar' }]);
  });
  it('Prometheus query with rate function and exact equals labels ( 2 labels ) and metric __name__', () => {
    const instance = new LanguageProvider(dataSource);
    var promQuery: PromQuery = { refId: 'bar', expr: 'rate(my_metric{label1="value1",label2="value2"}[5m])' };
    const result = instance.importQueries([promQuery], 'prometheus');
    expect(result).toEqual([
      { isLogsQuery: true, query: '__name__:"my_metric" AND label1:"value1" AND label2:"value2"', refId: 'bar' },
    ]);
  });
  it('Prometheus query with rate function and exact equals labels not equals labels regex and not regex labels and metric __name__', () => {
    const instance = new LanguageProvider(dataSource);
    var promQuery: PromQuery = {
      refId: 'bar',
      expr: 'rate(my_metric{label1="value1",label2!="value2",label3=~"value.+",label4!~".*tothemoon"}[5m])',
    };
    const result = instance.importQueries([promQuery], 'prometheus');
    expect(result).toEqual([
      {
        isLogsQuery: true,
        query:
          '__name__:"my_metric" AND label1:"value1" AND NOT label2:"value2" AND label3:/value.+/ AND NOT label4:/.*tothemoon/',
        refId: 'bar',
      },
    ]);
  });
});
describe('transform prometheus query to elasticsearch query errors', () => {
  it('bad prometheus query with only bracket', () => {
    const instance = new LanguageProvider(dataSource);
    var promQuery: PromQuery = { refId: 'bar', expr: '{' };
    const result = instance.importQueries([promQuery], 'prometheus');
    expect(result).toEqual([{ isLogsQuery: true, query: '', refId: 'bar' }]);
  });
  it('bad prometheus empty query', async () => {
    const instance = new LanguageProvider(dataSource);
    var promQuery: PromQuery = { refId: 'bar', expr: '' };
    const result = instance.importQueries([promQuery], 'prometheus');
    expect(result).toEqual([{ isLogsQuery: true, query: '', refId: 'bar' }]);
  });
  it('graphite query not handle', async () => {
    const instance = new LanguageProvider(dataSource);
    var promQuery: PromQuery = { refId: 'bar', expr: '' };
    const result = instance.importQueries([promQuery], 'graphite');
    expect(result).toEqual([{ isLogsQuery: true, query: '', refId: 'bar' }]);
  });
});
