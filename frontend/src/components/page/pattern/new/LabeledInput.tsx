import HelpIcon from '@/components/ui/icons/HelpIcon';

interface PLabeledInput {
  label: string;
  input: React.ReactNode;
  help?: string;
}

const LabeledInput: React.FC<PLabeledInput> = ({ label, input, help }) => {
  return (
    <div className='flex w-full items-start gap-2.5'>
      <label className='flex w-28 items-center gap-0.5'>
        <span className='font-bold'>{label}</span>
        {help && <HelpIcon content={help} />}
      </label>
      <div className='grow'>{input}</div>
    </div>
  );
};

export default LabeledInput;
