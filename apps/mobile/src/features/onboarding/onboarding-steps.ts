import OnBoardingPhoneImage from "@/assets/images/onboarding/onboarding-1.svg";
import OnBoardingMapImage from "@/assets/images/onboarding/onboarding-2.svg";
import OnBoardingTruckImage from "@/assets/images/onboarding/onboarding-3.svg";

export const ONBOARDING_STEPS = [
  {
    Image: OnBoardingPhoneImage,
    description: "Seamlessly manage your delivery routes",
    title: "Route building",
  },
  {
    Image: OnBoardingMapImage,
    description: "Optimize delivery schedules for maximum efficiency.",
    title: "Optimize delivery schedules",
  },
  {
    Image: OnBoardingTruckImage,
    description: "Monitor deliveries in real-time and stay in control.",
    title: "Track everything",
  },
];

export type OnBoardingStep = (typeof ONBOARDING_STEPS)[number];
