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
  transparent?: boolean;
  options: any[];
  popularOptions?: any[];
  clearAll: boolean;
  showSelected?: boolean;
  mainGroupTitle?: string;
  groupSeparators?: boolean;
  onChange?: (data: any) => void;
}

export const Select: FC<IProp> = ({
  caption = '',
  value,
  transparent = false,
  popularOptions,
  options,
  showSelected = false,
  clearAll,
  mainGroupTitle = '',
  groupSeparators = false,
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
    ({ id, name }) => {
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

  const handleClearAll = (): void => {
    setSelectedItems([]);
  };

  const displaiedValue = useMemo(
    () =>
      selectedItems
        .map(({ name }) => name)
        .sort()
        .join(', '),
    [selectedItems]
  );

  return (
    <div className={cn('selectWrapper')}>
      <div
        className={cn(
          'selectInputWrapper',
          { selectInputWrapperTransparent: transparent },
          {
            selectInputWrapperActive: showDropDown,
          }
        )}
      >
        <input
          ref={inputRef}
          type="text"
          className={cn('selectInput', {
            selectInputActive: selectedItems.length > 0,
          })}
          value={displaiedValue}
          onClick={handleInputClick}
          onFocus={handleInputClick}
          onBlur={handleInputBlur}
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
        className={cn(
          'selectDropDownList',
          {
            selectDropDownListActive: showDropDown,
          },
          { selectDropDownListSeparators: groupSeparators }
        )}
      >
        {clearAll && (
          <DropDownItem
            iconSrc="https://storage.yandexcloud.net/alfaleasing/components/cross-icon.svg"
            showIcon
            item={{ name: 'Любая' }}
            onItemSelect={handleClearAll}
          />
        )}
        {showSelected && selectedItems.length > 0 && (
          <DropDownGroup
            groupTitle="Выбранные модели"
            items={selectedItems}
            onItemClick={handleSelectItem}
            selected={selectedItems}
          />
        )}
        {popularOptions && (
          <DropDownGroup
            groupTitle="Популярные"
            items={popularOptions}
            onItemClick={handleSelectItem}
            selected={selectedItems}
          />
        )}
        <DropDownGroup
          groupTitle={mainGroupTitle || null}
          items={options}
          onItemClick={handleSelectItem}
          selected={selectedItems}
        />
      </div>
    </div>
  );
};
