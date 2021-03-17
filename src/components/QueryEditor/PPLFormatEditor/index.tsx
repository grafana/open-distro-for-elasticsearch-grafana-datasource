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

import React, { FunctionComponent, useState } from 'react';
import { defaultPPLFormat } from '../../../query_def';
import { useQuery } from '../ElasticsearchQueryContext';
import { QueryEditorRow } from '../QueryEditorRow';
import { SettingsEditor } from './SettingsEditor';
import { OpenCloseButton } from './OpenCloseButton';
import { HelpMessage } from './HelpMessage';

export const PPLFormatEditor: FunctionComponent = () => {
  const { format } = useQuery();

  const [displayHelp, setDisplayHelp] = useState(false);

  return (
    <>
      <QueryEditorRow label="Format">
        <SettingsEditor value={format ?? defaultPPLFormat()} />
        <OpenCloseButton label="Show help" open={displayHelp} onClick={() => setDisplayHelp(!displayHelp)} />
      </QueryEditorRow>
      {displayHelp && <HelpMessage />}
    </>
  );
};
