import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import DropdownIcon from '/public/svg/DropdownIcon.svg';

interface PDropdown<T extends string> {
  list: T[];
  value?: T;
  onClick: (value: T) => void;
  placeholder: string;
}

function Dropdown<T extends string>({ list, value, onClick, placeholder }: PDropdown<T>) {
  return (
    <Menu>
      <MenuButton as={Fragment}>
        {() => (
          <button
            className='flex w-36 cursor-pointer items-center justify-between rounded-sm border border-primary-dark bg-white px-3 py-2 font-bold hover:opacity-90'
            onClick={() => {}}
          >
            {value ?? placeholder}
            <DropdownIcon />
          </button>
        )}
      </MenuButton>
      <MenuItems
        anchor='bottom'
        className='min-w-36 divide-y divide-primary-dark rounded-sm border border-primary-dark bg-white font-bold'
      >
        {list.map((text) => (
          <MenuItem key={text} as={Fragment}>
            {({ focus }) => (
              <div
                onClick={() => onClick(text)}
                className={clsx('block cursor-pointer px-3 py-1', focus && 'bg-black/5')}
              >
                {text}
              </div>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default Dropdown;
