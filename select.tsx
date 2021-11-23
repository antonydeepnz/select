import React, { FC, useState, useRef, useCallback } from 'react';
import cn from 'classnames';

import { DropDownGroup } from './DropDownGroup';
import { DropDownItem } from './DropDownItem';

type TValue<T> = T | T[];

interface IProp {
  caption?: string;
  value: TValue<string> | null;
  white?: boolean;
  options: any[];
  popularOptions?: any[];
  onClear?: () => void;
  showSelected?: boolean;
}

export const Select: FC<IProp> = ({
  caption = '',
  value,
  white = false,
  popularOptions,
  options,
  showSelected = false,
  onClear,
}) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setShowDropDown((prev) => !prev);
  };

  const handleInputBlur = (): void => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    // setShowDropDown(false);
  };

  const handleSelectItem = useCallback(
    (id: string): void => {
      if (!selectedItems.includes(id)) {
        setSelectedItems([...selectedItems, id]);
      } else {
        setSelectedItems([...selectedItems.filter((el) => id !== el)]);
      }
    },
    [selectedItems]
  );

  console.log(selectedItems);

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
          className={cn('selectArrow', {
            selectArrowActive: showDropDown,
          })}
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
        {showSelected && selectedItems.length > 0 && (
          <DropDownGroup
            groupTitle="Выбранные"
            items={selectedItems}
            bottomBorder={true}
            onItemClick={handleSelectItem}
          />
        )}
        {popularOptions && (
          <DropDownGroup
            groupTitle="Популярные"
            items={popularOptions}
            bottomBorder={true}
            onItemClick={handleSelectItem}
          />
        )}
        <DropDownGroup
          groupTitle="Все"
          items={options}
          bottomBorder={true}
          onItemClick={handleSelectItem}
        />
      </div>
    </div>
  );
};
