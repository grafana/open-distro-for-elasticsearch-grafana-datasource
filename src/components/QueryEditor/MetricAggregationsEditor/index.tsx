import React, { FunctionComponent } from 'react';
import { MetricEditor } from './MetricEditor';
import { useDispatch } from '../../../hooks/useStatelessReducer';
import { MetricAggregationAction } from './state/types';
import { metricAggregationConfig } from './utils';
import { addMetric, removeMetric, toggleMetricVisibility } from './state/actions';
import { MetricAggregation } from './aggregations';
import { useQuery } from '../ElasticsearchQueryContext';
import { QueryEditorRow } from '../QueryEditorRow';
import { IconButton } from '../../IconButton';

interface Props {
  nextId: MetricAggregation['id'];
}

export const MetricAggregationsEditor: FunctionComponent<Props> = ({ nextId }) => {
  const dispatch = useDispatch<MetricAggregationAction>();
  const { metrics } = useQuery();
  const totalMetrics = metrics?.length || 0;

  return (
    <>
      {metrics?.map((metric, index) => (
        <QueryEditorRow
          key={metric.id}
          label={`Metric (${metric.id})`}
          hidden={metric.hide}
          onHideClick={() => dispatch(toggleMetricVisibility(metric.id))}
          onRemoveClick={() => dispatch(removeMetric(metric.id))}
          disableRemove={!(totalMetrics > 1)}
        >
          <MetricEditor value={metric} />

          {!metricAggregationConfig[metric.type].isSingleMetric && index === 0 && (
            <IconButton iconName="plus" onClick={() => dispatch(addMetric(nextId))} label="add" />
          )}
        </QueryEditorRow>
      ))}
    </>
  );
};
