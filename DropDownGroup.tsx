import React, { FC } from 'react';
import cn from 'classnames';

import { DropDownItem } from './DropDownItem';

type TItem = { id?: string; name: string };

interface IProp {
  groupTitle?: string;
  items: any[];
  bottomBorder?: boolean;
  selected: any[];
  onItemClick: (item: TItem) => void;
}

export const DropDownGroup: FC<IProp> = ({
  groupTitle = '',
  items,
  selected,
  onItemClick,
}) => {
  return (
    <div className={cn('dropDownGroup')}>
      {groupTitle && <h4 className={cn('dropDownGroupTitle')}>{groupTitle}</h4>}
      {items &&
        items.map(({ id, name, items }) => (
          <DropDownItem
            key={id}
            item={{ id, name }}
            additionalItems={items}
            checked={selected.some(({ id: uid }) => uid === id)}
            onItemSelect={onItemClick}
          />
        ))}
    </div>
  );
};
