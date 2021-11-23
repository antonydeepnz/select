import React, { FC } from 'react';
import cn from 'classnames';

type TValue<T> = T | T[];

interface IProp {
  value: TValue<string>;
  white?: boolean;
}

export const Select: FC<IProp> = ({ value, white = false }) => {
  return (
    <div className={cn('selectWrapper')}>
      <input className={cn("selectInput", { selectInputWhite: white})} value={value} />
    </div>
  );
};
