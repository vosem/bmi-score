import React, {useEffect, useRef, useState} from 'react';
import cx from 'classnames';

import Bar from './Bar';

import styles from './styles.module.scss';

type Props = {
  name: string;
}

const PARTS_NUMBER = 3;

const Bars = ({ name }: Props): JSX.Element => {
  const [bmi, setBmi] = useState(0);
  const [isInitial, setInitial] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { current } = ref;

  useEffect(() => {
    setBmi(88.89);

    const timer = setTimeout(() => {
      setInitial(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const calculateDependentOffset = (bmi: number): number => {
    let underPoints = Math.min(bmi, 30);
    let normalPoints = Math.max(Math.min(bmi, 90) - 30, 0);
    let overPoints = Math.max(Math.min(bmi, 120) - 90, 0);

    let underResult = (current?.offsetWidth ?? 0 / PARTS_NUMBER) * underPoints / (30 * PARTS_NUMBER);
    let normalResult = (current?.offsetWidth ?? 0 / PARTS_NUMBER) * normalPoints / (60 * PARTS_NUMBER);
    let overResult = (current?.offsetWidth ?? 0 / PARTS_NUMBER) * overPoints / (30 * PARTS_NUMBER);

    return underResult + normalResult + overResult;
  }

  const calculateConstantOffset = (bmi: number): number =>
    (current?.offsetWidth ?? 0) * (bmi / 120);

  return (
      <div className={styles.Wrapper} ref={ref}>
        <div className={styles.Title}>{`${name}'s BMI is`}</div>
        <div
          className={styles.Value}
          onClick={() => setBmi(Math.round((Math.random() * 120) * 100) / 100)}
        >
          <div className={cx(styles.Button, { [styles.Initial]: isInitial })}>{bmi}</div>
        </div>
        <div className={styles.Bars}>
          <Bar bmi={bmi} offsetHandler={calculateDependentOffset} isEqual />
          <Bar bmi={bmi} offsetHandler={calculateConstantOffset} />
        </div>
      </div>
  );
};

export default Bars;
