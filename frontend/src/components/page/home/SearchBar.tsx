import TextInput from '@/components/ui/input/TextInput';
import SearchDropdown from '@/components/page/home/SearchDropdown';
import { useEffect, useRef, useState } from 'react';
import SearchIcon from '/public/svg/searchIcon.svg';
import { useSearchContext } from '@/hooks/useSearchContext';
import { useRouter } from 'next/navigation';
import { CRAFT_NUM, NEEDLE_NUM } from '@/lib/constants/post';
import { craftTypeKrToEn } from '@/lib/pattern';

const SearchBar: React.FC = () => {
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { keyword, needle, crafts, setKeyword } = useSearchContext();

  const handleFocusSearchBar = () => {
    setOnFocus(true);
  };

  const handleBlurSearchBar = () => {
    setOnFocus(false);
  };

  const handleSearch = () => {
    const categoryIds = [];
    if (needle) categoryIds.push(NEEDLE_NUM[needle]);
    crafts.forEach((craft) => {
      categoryIds.push(CRAFT_NUM[craftTypeKrToEn[craft]]);
    });

    const categoryParams = categoryIds.join(',');

    const queryParams = [];
    if (keyword) queryParams.push(`keyword=${keyword}`);
    if (categoryParams) queryParams.push(`categoryIds=${categoryParams}`);

    const route = `/feeds/search?${queryParams.join('&')}`;
    router.push(route);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        handleBlurSearchBar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={searchBarRef}>
      <div className='flex items-center gap-4'>
        <TextInput
          value={keyword}
          onChange={setKeyword}
          onFocus={handleFocusSearchBar}
          placeholder='검색어를 입력해 주세요.'
        />
        <SearchIcon onClick={handleSearch} className='cursor-pointer' />
      </div>
      {onFocus && <SearchDropdown />}
    </div>
  );
};

export default SearchBar;
