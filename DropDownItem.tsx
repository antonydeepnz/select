import React, { FC, useState } from 'react';
import cn from 'classnames';

interface IProps {
  iconSrc?: string;
  selected: boolean;
  text: string;
}

export const DropDownItem: FC<IProps> = ({
  iconSrc = 'https://storage.yandexcloud.net/alfaleasing/components/dropdown-selected.svg',
  selected,
  text,
}) => {
  return (
    <div className={cn('dropDownItem', { dropDownItemSelected: selected })}>
      <img alt="" className={cn('dropDownItemImage')} src={iconSrc} />
      <p className={cn('dropDownItemText')}>{text}</p>
    </div>
  );
};
