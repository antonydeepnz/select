import React, { FC, useState } from 'react';
import cn from 'classnames';

import { DropDownItem } from './DropDownItem';

interface IProp {
  groupTitle?: string;
  items: any[];
  bottomBorder?: boolean;
  onItemClick: ({ id, name }) => () => void;
}

export const DropDownGroup: FC<IProp> = ({
  groupTitle = '',
  items,
  bottomBorder = false,
  onItemClick,
}) => {
  return (
    <div className={cn('dropDownGroup', { dropDownGroupBorder: bottomBorder })}>
      {groupTitle && <h4 className={cn('dropDownGroupTitle')}>{groupTitle}</h4>}
      {items &&
        items.map(({ id, name }) => (
          <DropDownItem
            key={id}
            id={id}
            selected={false}
            text={name}
            onClick={onItemClick({ id, name })}
          />
        ))}
    </div>
  );
};
