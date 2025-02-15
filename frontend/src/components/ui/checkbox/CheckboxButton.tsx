import Button from '@/components/ui/button/Button';

interface PCheckboxButton<T extends string> {
  list: T[]; // 전체 아이템 리스트
  values: T[]; // 선택된 아이템 리스트
  onClick: (value: T) => void;
}

const CheckboxButton = <T extends string>({ list, values, onClick }: PCheckboxButton<T>) => {
  return (
    <div className='flex flex-wrap gap-2.5'>
      {list.map((item) => (
        <Button type={values.includes(item) ? 'filled' : 'outlined'} onClick={() => onClick(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default CheckboxButton;
