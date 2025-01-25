import SignUpForm from '@/components/signup/SignUpForm';

const SignUp: React.FC = () => {
  return (
    <div className='mx-auto flex w-base flex-col gap-4'>
      <header className='flex items-center justify-between text-heading1 font-bold'>
        <span>프로필 정보 입력</span>
      </header>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
