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
import { INIT, InitAction } from '../state';
import { PPLFormatType } from './formats';

export const CHANGE_FORMAT = 'change_format';

export interface ChangeFormatAction extends Action<typeof CHANGE_FORMAT> {
  payload: {
    format: PPLFormatType;
  };
}

export const changeFormat = (format: PPLFormatType): ChangeFormatAction => ({
  type: CHANGE_FORMAT,
  payload: {
    format,
  },
});

export const formatReducer = (prevFormat: PPLFormatType, action: ChangeFormatAction | InitAction) => {
  switch (action.type) {
    case CHANGE_FORMAT:
      return action.payload.format;

    case INIT:
      return 'table';

    default:
      return prevFormat;
  }
};
