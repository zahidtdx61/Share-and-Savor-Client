import { useLottie } from "lottie-react";
import featuredFoodLottie from "./featuredFoods.json";

const style = {
  height: 300,
};
const FeaturedFoodLottie = () => {
  const options = {
    animationData: featuredFoodLottie,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return View;
};

export default FeaturedFoodLottie;
