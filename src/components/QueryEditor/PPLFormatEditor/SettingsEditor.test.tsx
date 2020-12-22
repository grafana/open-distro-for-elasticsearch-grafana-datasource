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
import { SettingsEditor } from './SettingsEditor';
import { Segment } from '@grafana/ui';
import { CHANGE_FORMAT, ChangeFormatAction } from './state';

const mockDispatch = jest.fn();

jest.mock('../../../hooks/useStatelessReducer', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));

describe('SettingsEditor', () => {
  it('should render correctly', () => {
    shallow(<SettingsEditor value={'time_series'} />);
  });

  it('should dispatch action on change event', () => {
    const expectedAction: ChangeFormatAction = {
      type: CHANGE_FORMAT,
      payload: { format: 'time_series' },
    };
    const wrapper = shallow(<SettingsEditor value={'table'} />);
    wrapper.find(Segment).simulate('change', { value: 'time_series' });
    expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
  });
});
