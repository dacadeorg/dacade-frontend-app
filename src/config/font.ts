import localFont from "next/font/local";

const graphik = localFont({
  src: [
    {
      path: "../fonts/Graphik-Medium-Web.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Graphik-Medium-Web.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Graphik-Regular-Web.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/GraphikRegularItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-graphik",
});

export default graphik;
