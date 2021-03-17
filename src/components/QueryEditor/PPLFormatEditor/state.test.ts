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

import { reducerTester } from '../../../dependencies/reducerTester';
import { ElasticsearchQuery } from '../../../types';
import { changeFormat, formatReducer } from './state';

describe('Query Type Reducer', () => {
  it('Should correctly set `format`', () => {
    const expectedFormat: ElasticsearchQuery['format'] = 'time_series';

    reducerTester()
      .givenReducer(formatReducer, 'table')
      .whenActionIsDispatched(changeFormat(expectedFormat))
      .thenStateShouldEqual(expectedFormat);
  });

  it('Should not change state with other action types', () => {
    const initialState: ElasticsearchQuery['format'] = 'time_series';

    reducerTester()
      .givenReducer(formatReducer, initialState)
      .whenActionIsDispatched({ type: 'THIS ACTION SHOULD NOT HAVE ANY EFFECT IN THIS REDUCER' })
      .thenStateShouldEqual(initialState);
  });
});
