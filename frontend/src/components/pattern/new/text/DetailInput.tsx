import TextArea from '@/components/ui/input/TextArea';

interface PDetailInput {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DetailInput: React.FC<PDetailInput> = ({ onChange }) => {
  return <TextArea minHeight={144} onChange={onChange} placeholder='생성할 도안의 상세 설명을 작성해 주세요.' />;
};

export default DetailInput;
