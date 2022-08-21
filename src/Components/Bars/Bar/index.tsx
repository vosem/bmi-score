import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import { ReactComponent as PinIcon } from './images/pin.svg';

import styles from './styles.module.scss';

type Props = {
  bmi: number;
  offsetHandler: (value: number) => number;
  isEqual?: boolean;
};

const Bar = ({ bmi, isEqual, offsetHandler }: Props): JSX.Element => {
  const [left, setLeft] = useState<string>('-10px');

  useEffect(() => {
    setLeft(`${offsetHandler(bmi) - 10}px`);
  }, [bmi, offsetHandler])

  return (
      <div className={styles.Wrapper}>
        <div className={styles.Pin} style={{ left }}>
          <PinIcon />
        </div>
        <div className={styles.Bar}>
          <div className={cx(styles.Under, {
            [styles.Active]:  bmi < 30,
            [styles.Equal]: isEqual,
          })} />
          <div className={cx(styles.Normal, {
            [styles.Active]: bmi >= 30 && bmi <= 90,
            [styles.Equal]: isEqual,
          })} />
          <div className={cx(styles.Over, {
            [styles.Active]: bmi > 90,
            [styles.Equal]: isEqual,
          })} />
        </div>
        <div className={styles.Description}>
          <div className={cx(styles.Under, { [styles.Equal]: isEqual })}>Underweight</div>
          <div className={cx(styles.Normal, { [styles.Equal]: isEqual })}>Normal</div>
          <div className={cx(styles.Over, { [styles.Equal]: isEqual })}>Overweight</div>
        </div>
      </div>
  );
};

export default Bar;
