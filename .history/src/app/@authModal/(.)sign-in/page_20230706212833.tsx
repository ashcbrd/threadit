import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="containter flex items-center h-full max-w-lg mx-auto"></div>
    </div>
  );
};

export default page;
