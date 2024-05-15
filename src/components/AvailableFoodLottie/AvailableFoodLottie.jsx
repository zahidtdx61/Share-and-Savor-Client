import { useLottie } from "lottie-react";
import availableFoodLottie from "./availableFoods.json";

const style = {
  height: 300,
};

const AvailableFoodLottie = () => {
  const options = {
    animationData: availableFoodLottie,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default AvailableFoodLottie;
