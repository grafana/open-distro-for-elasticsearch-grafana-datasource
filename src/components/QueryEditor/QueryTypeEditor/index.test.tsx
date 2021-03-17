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

import React from 'react';
import { shallow } from 'enzyme';
import { QueryTypeEditor } from './';
import { Segment } from '@grafana/ui';
import { ElasticsearchQueryType } from '../../../types';
import { CHANGE_QUERY_TYPE, ChangeQueryTypeAction } from './state';

const mockDatasource = {
  getSupportedQueryTypes: () => [ElasticsearchQueryType.Lucene, ElasticsearchQueryType.PPL],
};

jest.mock('../ElasticsearchQueryContext', () => ({
  useDatasource: jest.fn(() => mockDatasource),
}));

const mockDispatch = jest.fn();

jest.mock('../../../hooks/useStatelessReducer', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));

describe('QueryTypeEditor', () => {
  it('should render correctly', () => {
    shallow(<QueryTypeEditor value={ElasticsearchQueryType.Lucene} />);
  });

  it('should dispatch action on change event', () => {
    const expectedAction: ChangeQueryTypeAction = {
      type: CHANGE_QUERY_TYPE,
      payload: { queryType: ElasticsearchQueryType.Lucene },
    };
    const wrapper = shallow(<QueryTypeEditor value={ElasticsearchQueryType.PPL} />);
    wrapper.find(Segment).simulate('change', { value: ElasticsearchQueryType.Lucene });
    expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
  });
});
