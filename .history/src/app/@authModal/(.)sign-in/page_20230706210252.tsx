import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p className="text-2xl">INTERCEPT</p>
    </div>
  );
};

export default page;
