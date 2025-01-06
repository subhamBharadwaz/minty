"use client";

import Lottie from "lottie-react";
import financeAnimation from "../../../../public/finance-lottie.json";

const LottieAnim = () => {
  return (
    <div className="rounded-md overflow-hidden w-full max-w-7xl max-h-[700px] ">
      <Lottie animationData={financeAnimation} />
    </div>
  );
};

export default LottieAnim;
