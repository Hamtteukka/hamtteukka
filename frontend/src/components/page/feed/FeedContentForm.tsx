'use client';

import Button from '@/components/ui/button/Button';
import { TFeedInfo } from '@/types/post';
import Badge from '@/components/ui/badge/Badge';
import { H1 } from '@/components/typography/Heading';
import { CRAFT_KR, NEEDLE_KR } from '@/lib/constants/post';
import Avatar from '@/components/ui/Avatar';
import AIPatternEmbedCard from '@/components/page/feed/AIPatternEmbedCard';
import Link from 'next/link';
import BookmarkFilledIcon from '/public/svg/bookmarkFilledIcon.svg';
import BookmarkOutlinedIcon from '/public/svg/bookmarkOutlinedIcon.svg';
import { useState } from 'react';
import { deleteFeed, scrapFeed } from '@/service/feed';
import { useRouter } from 'next/navigation';

interface PFeedContentForm {
  feedInfo: TFeedInfo;
}

const FeedContentForm: React.FC<PFeedContentForm> = ({
  feedInfo: { feedId, title, content, categoryIds, owner, isScrap, user, aiPattern },
}) => {
  const router = useRouter();
  const [curIsScrap, setCurIsScrap] = useState<boolean>(isScrap);

  const toggleBookmark = async () => {
    const { isScrap: newIsScrap } = await scrapFeed(feedId, curIsScrap);
    setCurIsScrap(newIsScrap);
  };

  const handleDelete = async () => {
    try {
      await deleteFeed(feedId);
      alert(`${title}\n게시물을 성공적으로 삭제하였습니다.`);
      router.push(`/profile/${user.userId}`);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className='flex w-3/5 flex-col gap-8 overflow-y-auto border-l bg-white px-10 py-10'>
      <section className='flex flex-col gap-2'>
        <Link href={`/profile/${user.userId}`} className='flex cursor-pointer items-center gap-2.5 self-start'>
          <Avatar src={user.profileId} />
          <span className='text-detail'>{user.nickname}</span>
        </Link>
        <div className='flex items-center justify-between'>
          <H1>{title}</H1>
          {owner ? (
            <Button onClick={handleDelete} type='warning-outlined'>
              삭제
            </Button>
          ) : curIsScrap ? (
            <BookmarkFilledIcon onClick={toggleBookmark} className='cursor-pointer' />
          ) : (
            <BookmarkOutlinedIcon onClick={toggleBookmark} className='cursor-pointer' />
          )}
        </div>

        <div className='flex gap-2'>
          {categoryIds[0] && <Badge>{NEEDLE_KR[categoryIds[0] as keyof typeof NEEDLE_KR]}</Badge>}
          {categoryIds[1] && <Badge>{CRAFT_KR[categoryIds[1] as keyof typeof CRAFT_KR]}</Badge>}
        </div>
      </section>

      <section className='flex flex-col gap-8'>
        <p className='whitespace-pre-line'>{content}</p>
        {aiPattern && <AIPatternEmbedCard id={aiPattern.feedId} title={aiPattern.title} src={aiPattern.thumbnailUrl} />}
      </section>
    </div>
  );
};

export default FeedContentForm;
