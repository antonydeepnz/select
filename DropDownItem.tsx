import React, { FC, useState } from 'react';
import cn from 'classnames';

type TItem = { id?: string; name: string };

interface IProps {
  additionalItems?: any[];
  item: TItem;
  iconSrc?: string;
  showIcon?: boolean;
  checked?: boolean;
  iconMode?: 'display' | 'selected';
  onItemSelect?: (item: TItem) => void;
}

export const DropDownItem: FC<IProps> = ({
  additionalItems,
  item,
  iconSrc = 'https://storage.yandexcloud.net/alfaleasing/components/dropdown-selected.svg',
  checked,
  showIcon,
  onItemSelect = () => {},
}) => {
  const [openedAdditional, setOpenedAdditional] = useState<string[]>([]);

  const isOpened = openedAdditional.includes(item?.id);

  const handleAdditionalClick =
    (id: string) => (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      if (!isOpened) {
        setOpenedAdditional([...openedAdditional, id]);
      }

      if (isOpened) {
        setOpenedAdditional([...openedAdditional.filter((el) => el !== id)]);
      }
    };

  return (
    <div className={cn('dropDownItemWrapper')}>
      <div className={cn('dropDownItem')} onClick={() => onItemSelect(item)}>
        <img
          alt=""
          className={cn('dropDownItemImage', {
            dropDownItemImageSelected: checked || showIcon,
          })}
          src={iconSrc}
        />
        <p className={cn('dropDownItemText')}>{item?.name}</p>
        {additionalItems && (
          <button
            className={cn('dropDownItemAdditionalButton', {
              dropDownItemAdditionalButtonActive: isOpened,
            })}
            onClick={handleAdditionalClick(item.id)}
          />
        )}
      </div>
      <div className={cn('dropDownItemAdditionalWrapper')}>
        {additionalItems &&
          additionalItems.map(({ id: uid, name }) => (
            <React.Fragment>
              {isOpened && (
                <div
                  key={uid}
                  className={cn('dropDownItem')}
                  onClick={() => onItemSelect({ id: uid, name })}
                >
                  <img
                    alt=""
                    className={cn('dropDownItemImage', {
                      dropDownItemImageSelected: checked,
                    })}
                    src={iconSrc}
                  />
                  <p
                    className={cn(
                      'dropDownItemText',
                      'dropDownItemTextAdditional'
                    )}
                  >
                    {name}
                  </p>
                </div>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
