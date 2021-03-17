/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import React, { FunctionComponent } from 'react';
import { Segment } from '@grafana/ui';
import { useDatasource } from '../ElasticsearchQueryContext';
import { useDispatch } from '../../../hooks/useStatelessReducer';
import { changeQueryType } from './state';
import { queryTypeConfig, getQueryTypeOptions } from './utils';
import { segmentStyles } from '../styles';
import { ElasticsearchQueryType } from '../../../types';

const toOption = (queryType: ElasticsearchQueryType) => ({
  label: queryTypeConfig[queryType].label,
  value: queryType,
});

interface Props {
  value: ElasticsearchQueryType;
}

export const QueryTypeEditor: FunctionComponent<Props> = ({ value }) => {
  const datasource = useDatasource();
  const dispatch = useDispatch();

  return (
    <Segment
      className={segmentStyles}
      options={getQueryTypeOptions(datasource.getSupportedQueryTypes())}
      onChange={e => dispatch(changeQueryType(e.value!))}
      value={toOption(value)}
    />
  );
};
