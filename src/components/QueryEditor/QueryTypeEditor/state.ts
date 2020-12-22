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

import { Action } from '../../../hooks/useStatelessReducer';
import { ElasticsearchQueryType } from '../../../types';
import { INIT, InitAction } from '../state';

export const CHANGE_QUERY_TYPE = 'change_query_type';

export interface ChangeQueryTypeAction extends Action<typeof CHANGE_QUERY_TYPE> {
  payload: {
    queryType: ElasticsearchQueryType;
  };
}

export const changeQueryType = (queryType: ElasticsearchQueryType): ChangeQueryTypeAction => ({
  type: CHANGE_QUERY_TYPE,
  payload: {
    queryType,
  },
});

export const queryTypeReducer = (prevQueryType: ElasticsearchQueryType, action: ChangeQueryTypeAction | InitAction) => {
  switch (action.type) {
    case CHANGE_QUERY_TYPE:
      return action.payload.queryType;

    case INIT:
      return ElasticsearchQueryType.Lucene;

    default:
      return prevQueryType;
  }
};
