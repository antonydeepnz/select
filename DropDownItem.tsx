import React, { FC } from 'react';
import cn from 'classnames';

interface IProps {
  additionalItems?: any[];
  iconSrc?: string;
  showIcon: boolean;
  iconMode?: 'display' | 'selected';
  text: string;
  onClick?: () => void;
}

export const DropDownItem: FC<IProps> = ({
  additionalItems,
  iconSrc = 'https://storage.yandexcloud.net/alfaleasing/components/dropdown-selected.svg',
  showIcon,
  text,
  onClick = () => {},
}) => {
  return (
    <div className={cn('dropDownItem')} onClick={onClick}>
      <img
        alt=""
        className={cn('dropDownItemImage', {
          dropDownItemImageSelected: showIcon,
        })}
        src={iconSrc}
      />
      <p className={cn('dropDownItemText')}>{text}</p>
      {additionalItems && (
        <img alt="" className={cn('dropDownItemImageAdditional')} />
      )}
      {additionalItems &&
        additionalItems.map(({ id, name }) => (
          <div>
            <img
              alt=""
              className={cn('dropDownItemImage', {
                dropDownItemImageSelected: showIcon,
              })}
              src={iconSrc}
            />
            <p className={cn('dropDownItemText')}>{text}</p>
          </div>
        ))}
    </div>
  );
};
