'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className='border-primary-dark relative h-[13px] w-full grow overflow-hidden rounded-full border bg-white'>
      <SliderPrimitive.Range className='bg-primary-dark absolute h-full' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='border-primary-dark block h-6 w-6 cursor-pointer rounded-full border-[5px] bg-white shadow' />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;
