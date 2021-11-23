import React, { FC, useState } from 'react';
import cn from 'classnames';

import { DropDownGroup } from './DropDownGroup';

type TValue<T> = T | T[];

interface IProp {
  value: TValue<string> | null;
  white?: boolean;
  options: any[];
}

// https://storage.yandexcloud.net/alfaleasing/components/delete-icon.svg

export const Select: FC<IProp> = ({ value, white = false, options }) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const handleInputClick = () => {
    setShowDropDown(true);
  };

  return (
    <div className={cn('selectWrapper')}>
      <input
        className={cn(
          'selectInput',
          { selectInputWhite: white },
          { selectInputActive: showDropDown }
        )}
        value={value}
        onClick={handleInputClick}
        onFocus={handleInputClick}
      />
      <img
        alt=""
        className={cn('selectArrow')}
        src="https://storage.yandexcloud.net/alfaleasing/components/dropdown-arrow.svg"
      />
      <div
        className={cn('selectDropDownList', {
          selectDropDownListActive: showDropDown,
        })}
      >
        <DropDownGroup groupTitle="Bmw" items={options} bottomBorder />
      </div>
    </div>
  );
};
