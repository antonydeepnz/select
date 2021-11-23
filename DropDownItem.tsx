import React, { FC, useState } from 'react';
import cn from 'classnames';

interface IProps {
  id?: string;
  iconSrc?: string;
  selected?: boolean;
  iconMode?: 'display' | 'selected';
  text: string;
  onClick?: () => void;
}

export const DropDownItem: FC<IProps> = ({
  id,
  iconSrc = 'https://storage.yandexcloud.net/alfaleasing/components/dropdown-selected.svg',
  selected = false,
  text,
  onClick = () => {},
}) => {
  return (
    <div
      className={cn('dropDownItem', { dropDownItemSelected: selected })}
      onClick={onClick}
    >
      <img alt="" className={cn('dropDownItemImage')} src={iconSrc} />
      <p className={cn('dropDownItemText')}>{text}</p>
    </div>
  );
};
