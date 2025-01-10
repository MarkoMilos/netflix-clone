import localFont from "next/font/local";

const netflixSans = localFont({
  src: [
    { path: "../public/fonts/NetflixSans-Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/NetflixSans-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/NetflixSans-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/NetflixSans-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-netflix-sans",
});

export default netflixSans;
