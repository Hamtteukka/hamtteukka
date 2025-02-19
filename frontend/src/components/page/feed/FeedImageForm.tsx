import { TFeedInfo } from '@/types/post';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback } from 'react';
import LeftArrowIcon from '/public/svg/leftArrowIcon.svg';
import RightArrowIcon from '/public/svg/rightArrowIcon.svg';

interface PFeedImageForm {
  feedInfo: TFeedInfo;
}

const FeedImageForm: React.FC<PFeedImageForm> = ({ feedInfo: { images } }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className='relative flex h-screen w-2/5 flex-col items-center'>
      <div className='m-10 h-full overflow-hidden' ref={emblaRef}>
        <div className='flex h-full items-center'>
          {images.map((image) => (
            <div className='min-w-0 flex-none basis-full overflow-hidden rounded-sm object-cover'>
              <img src={image} />
            </div>
          ))}
        </div>
        <button className='embla__prev absolute left-0 top-1/2 -translate-y-1/2 transform' onClick={scrollPrev}>
          <LeftArrowIcon />
        </button>
        <button className='embla__next absolute right-0 top-1/2 -translate-y-1/2 transform' onClick={scrollNext}>
          <RightArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default FeedImageForm;
