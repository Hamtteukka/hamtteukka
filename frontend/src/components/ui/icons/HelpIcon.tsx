'use client';

import { useState } from 'react';
import Help from '/public/svg/helpIcon.svg';

interface PHelpIcon {
  content?: string;
}

const HelpIcon: React.FC<PHelpIcon> = ({ content }) => {
  const [helpBubble, setHelpBubble] = useState<boolean>(false);

  return (
    <span className='relative' onMouseOver={() => setHelpBubble(true)} onMouseLeave={() => setHelpBubble(false)}>
      <Help className='cursor-pointer' />
      {content && helpBubble && (
        <div className='absolute z-10 w-48 rounded-sm border bg-white p-2 text-detail shadow-md'>{content}</div>
      )}
    </span>
  );
};

export default HelpIcon;
