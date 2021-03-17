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
import { ElasticsearchQuery, ElasticsearchQueryType } from '../../types';
import { InlineField, InlineFieldRow, QueryField } from '@grafana/ui';
import { QueryTypeEditor } from './QueryTypeEditor';
import { PPLFormatEditor } from './PPLFormatEditor';
import { changeQuery } from './state';
import { useDispatch } from '../../hooks/useStatelessReducer';

interface Props {
  query: ElasticsearchQuery['query'];
}

export const PPLEditor: FunctionComponent<Props> = ({ query }) => {
  const dispatch = useDispatch();

  return (
    <>
      <InlineFieldRow>
        <InlineField label="Query" labelWidth={17} grow>
          <>
            <QueryTypeEditor value={ElasticsearchQueryType.PPL} />
            <QueryField
              query={query}
              onBlur={() => {}}
              onChange={query => dispatch(changeQuery(query))}
              placeholder="PPL Query"
              portalOrigin="elasticsearch"
            />
          </>
        </InlineField>
      </InlineFieldRow>
      <PPLFormatEditor />
    </>
  );
};
