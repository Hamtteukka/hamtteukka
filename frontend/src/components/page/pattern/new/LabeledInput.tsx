import HelpIcon from '@/components/ui/icons/HelpIcon';

interface PLabeledInput {
  label: string;
  input: React.ReactNode;
  help?: string;
  vertical?: boolean;
}

const LabeledInput: React.FC<PLabeledInput> = ({ label, input, help, vertical = false }) => {
  return (
    <div className={`flex items-start gap-2.5 ${vertical ? 'flex-col' : ''}`}>
      <label className='flex w-28 items-center gap-0.5'>
        <span className='font-bold'>{label}</span>
        {help && <HelpIcon content={help} />}
      </label>
      <div className='w-full grow'>{input}</div>
    </div>
  );
};

export default LabeledInput;
