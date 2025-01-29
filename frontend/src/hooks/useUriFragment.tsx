import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type PUseUriFragment = string;

export const useUriFragment = (initialUriFragment: PUseUriFragment) => {
  const [uriFragment, setUriFragment] = useState<string>(initialUriFragment);
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    setUriFragment(hash.split('#')[1]);
  }, [router]);

  const handleHashUrl = (hash: string | number) => {
    setUriFragment(hash.toString());
    router.replace(`#${hash}`);
  };

  return [uriFragment, handleHashUrl] as const;
};
