import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <p className="text-8xl font-bold">INTERCEPT</p>
      <p className="text-xl">this is the sign in modal</p>
    </div>
  );
};

export default page;
