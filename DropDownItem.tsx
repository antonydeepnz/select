import React, { FC, useState } from 'react';
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
  const [openedAdditional, setOpenedAdditional] = useState<string[]>([]);

  const handleAdditionalClick =
    (id: string) => (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropaganation();
      setOpenedAdditional([...openedAdditional, id]);
    };

  return (
    <div className={cn('dropDownItemWrapper')}>
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
          <button className={cn('dropDownItemImageAdditional')} />
        )}
      </div>
      {openedAdditional && (
        <div className={cn('dropDownItemAdditionalWrapper')}>
          {additionalItems &&
            additionalItems.map(({ id, name }) => (
              <div
                key={id}
                className={cn('dropDownItemAdditionalItem')}
                onClick={() => handleAdditionalClick(id)}
              >
                <img
                  alt=""
                  className={cn('dropDownItemImage', {
                    dropDownItemImageSelected: showIcon,
                  })}
                  src={iconSrc}
                />
                <p className={cn('dropDownItemText')}>{name}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
