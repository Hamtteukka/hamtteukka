import TextInput from '@/components/ui/input/TextInput';
import SearchDropdown from '@/components/page/home/SearchDropdown';
import { useEffect, useRef, useState } from 'react';
import SearchIcon from '/public/svg/searchIcon.svg';

const SearchBar: React.FC = () => {
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleFocusSearchBar = () => {
    setOnFocus(true);
  };

  const handleBlurSearchBar = () => {
    setOnFocus(false);
  };

  const handleSearch = () => {
    // TODO: 검색 API 호출
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
        <TextInput onChange={() => {}} onFocus={handleFocusSearchBar} placeholder='검색어를 입력해 주세요.' />
        <SearchIcon onClick={handleSearch} className='cursor-pointer' />
      </div>
      {onFocus && <SearchDropdown />}
    </div>
  );
};

export default SearchBar;
