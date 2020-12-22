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

import { GrafanaTheme } from '@grafana/data';
import { Icon, stylesFactory, useTheme } from '@grafana/ui';
import { css, cx } from 'emotion';
import React, { FunctionComponent } from 'react';
import { segmentStyles } from '../styles';

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    icon: css`
      margin-right: ${theme.spacing.xs};
    `,
    button: css`
      justify-content: start;
    `,
  };
});

interface Props {
  label: string;
  open: boolean;
  onClick: () => void;
}

export const OpenCloseButton: FunctionComponent<Props> = ({ label, open, onClick }) => {
  const styles = getStyles(useTheme());

  return (
    <button className={cx('gf-form-label', styles.button, segmentStyles)} onClick={onClick} aria-expanded={open}>
      <Icon name={open ? 'angle-down' : 'angle-right'} aria-hidden="true" className={styles.icon} />
      {label}
    </button>
  );
};
