import React, { FC, useState, useRef } from 'react';
import cn from 'classnames';

import { DropDownGroup } from './DropDownGroup';
import { DropDownItem } from './DropDownItem';

type TValue<T> = T | T[];

interface IProp {
  caption?: string;
  value: TValue<string> | null;
  white?: boolean;
  options: any[];
  onClear?: () => void;
}

export const Select: FC<IProp> = ({
  caption = '',
  value,
  white = false,
  options,
  onClear,
}) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setShowDropDown(!showDropDown);
  };

  const handleInputBlur = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className={cn('selectWrapper')}>
      <div
        className={cn('selectInputWrapper', {
          selectInputWrapperActive: showDropDown,
        })}
        onClick={handleInputClick}
        onFocus={handleInputClick}
        onBlur={handleInputBlur}
      >
        <input
          ref={inputRef}
          type="text"
          className={cn('selectInput', { selectInputWhite: white })}
          value={value}
        />
        <p
          className={cn('selectCaption', {
            selectCaptionActive: showDropDown || value,
          })}
        >
          {caption}
        </p>
        <img
          alt=""
          className={cn('selectArrow')}
          src="https://storage.yandexcloud.net/alfaleasing/components/dropdown-arrow.svg"
        />
      </div>
      <div
        className={cn('selectDropDownList', {
          selectDropDownListActive: showDropDown,
        })}
      >
        {onClear && (
          <DropDownItem
            iconSrc="https://storage.yandexcloud.net/alfaleasing/components/cross-icon.svg"
            selected={true}
            text="Любая"
          />
        )}
        <DropDownGroup groupTitle="Bmw" items={options} bottomBorder={true} />
      </div>
    </div>
  );
};
