import { FunctionalComponent, h, Fragment } from '@stencil/core';

interface RatingSummaryProps {
  value: number;
  max: number;
}

export const RatingSummary: FunctionalComponent<RatingSummaryProps> = ({ value, max }) => {
  const percent = Math.round((value / max) * 100);

  return (
    <Fragment>
      <p>Score: {value} / {max}</p>
      <p>That's {percent}% satisfaction</p>
    </Fragment>
  );
};