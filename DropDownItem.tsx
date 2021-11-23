import React, { FC, useState } from 'react';
import cn from 'classnames';

interface IProps {
  additionalItems?: any[];
  id: string;
  iconSrc?: string;
  checked: boolean;
  iconMode?: 'display' | 'selected';
  text: string;
  onClick?: () => void;
}

export const DropDownItem: FC<IProps> = ({
  additionalItems,
  id,
  iconSrc = 'https://storage.yandexcloud.net/alfaleasing/components/dropdown-selected.svg',
  checked,
  text,
  onClick = () => {},
}) => {
  const [openedAdditional, setOpenedAdditional] = useState<string[]>([]);

  const handleAdditionalClick =
    (id: string) => (event: React.MouseEvent<HTMLElement>) => {
      // event.stopPropaganation();
      setOpenedAdditional([...openedAdditional, id]);
    };

  const isOpened = openedAdditional.includes(id);

  return (
    <div className={cn('dropDownItemWrapper')}>
      <div className={cn('dropDownItem')} onClick={onClick}>
        <img
          alt=""
          className={cn('dropDownItemImage', {
            dropDownItemImageSelected: checked,
          })}
          src={iconSrc}
        />
        <p className={cn('dropDownItemText')}>{text}</p>
        {additionalItems && (
          <button
            className={cn('dropDownItemAdditionalButton', {dropDownItemAdditionalButtonActive: isOpened})}
            onClick={handleAdditionalClick(id)}
          />
        )}
      </div>
      <div className={cn('dropDownItemAdditionalWrapper')}>
        {additionalItems &&
          additionalItems.map(({ id: uid, name }) => {
            return (
              <React.Fragment>
                {isOpened && (
                  <div
                    key={uid}
                    className={cn('dropDownItem')}
                    onClick={() => handleAdditionalClick(uid)}
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
            );
          })}
      </div>
    </div>
  );
};
