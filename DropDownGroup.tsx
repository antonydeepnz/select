import React, { FC } from 'react';
import cn from 'classnames';

import { DropDownItem } from './DropDownItem';

interface IProp {
  groupTitle?: string;
  items: any[];
  bottomBorder?: boolean;
  selected: any[];
  onItemClick: ({ id, name }) => () => void;
}

export const DropDownGroup: FC<IProp> = ({
  groupTitle = '',
  items,
  bottomBorder = false,
  selected,
  onItemClick,
}) => {
  return (
    <div className={cn('dropDownGroup', { dropDownGroupBorder: bottomBorder })}>
      {groupTitle && <h4 className={cn('dropDownGroupTitle')}>{groupTitle}</h4>}
      {items &&
        items.map(({ id, name, items }) => (
          <DropDownItem
            key={id}
            additionalItems={items}
            showIcon={selected.some(({ id: uid }) => uid === id)}
            text={name}
            onClick={onItemClick({ id, name })}
          />
        ))}
    </div>
  );
};
