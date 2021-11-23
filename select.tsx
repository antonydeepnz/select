import React, {
  FC,
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
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
  onChange?: (data: any) => void;
}

export const Select: FC<IProp> = ({
  caption = '',
  value,
  white = false,
  popularOptions,
  options,
  showSelected = false,
  onClear,
  onChange,
}) => {
  const [renders, setRenders] = useState<number>(0);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   setRenders((prev) => prev + 1);
  //   onChange(selectedItems);
  // }, [selectedItems]);

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
    ({ id, name }) =>
      (): void => {
        if (!selectedItems.some(({ id: uid }) => uid === id)) {
          setSelectedItems([...selectedItems, { id, name }]);
        } else {
          setSelectedItems([
            ...selectedItems.filter(({ id: key }) => id !== key),
          ]);
        }
      },
    [selectedItems]
  );

  const displaiedValue = useMemo(
    () => selectedItems.map(({ name }) => name).join(', '),
    [selectedItems]
  );

  console.log(renders, selectedItems);

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
          value={displaiedValue}
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
            showIcon
            text="Любая"
          />
        )}
        {showSelected && selectedItems.length > 0 && (
          <DropDownGroup
            groupTitle="Выбранные"
            items={selectedItems}
            onItemClick={handleSelectItem}
            selected={selectedItems}
          />
        )}
        {popularOptions && (
          <DropDownGroup
            groupTitle="Популярные"
            items={popularOptions}
            bottomBorder={true}
            onItemClick={handleSelectItem}
            selected={selectedItems}
          />
        )}
        <DropDownGroup
          groupTitle="Все"
          items={options}
          bottomBorder={true}
          onItemClick={handleSelectItem}
          selected={selectedItems}
        />
      </div>
    </div>
  );
};
