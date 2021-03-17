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

import { getQueryTypeOptions } from './utils';
import { ElasticsearchQueryType } from '../../../types';

describe('getQueryTypeOptions', () => {
  describe('given no supported types', () => {
    const queryTypeOptions = getQueryTypeOptions([]);
    it('should return no query type options', () => {
      expect(queryTypeOptions.length).toBe(0);
    });
  });

  describe('given Lucene as a supported type', () => {
    const queryTypeOptions = getQueryTypeOptions([ElasticsearchQueryType.Lucene]);
    it('should return Lucene query type option', () => {
      expect(queryTypeOptions.length).toBe(1);
      expect(queryTypeOptions[0].value).toBe(ElasticsearchQueryType.Lucene);
    });
  });
});
