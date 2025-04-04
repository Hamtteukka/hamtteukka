import SignUpForm from '@/components/page/auth/SignUpForm';

const SignUp: React.FC = () => {
  return (
    <div className='mx-10 flex flex-col gap-4 py-10'>
      <header className='flex items-center justify-between text-heading1 font-bold'>
        <span>프로필 정보 입력</span>
      </header>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
