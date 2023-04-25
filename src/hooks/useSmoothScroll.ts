import { NextRouter } from "next/router";
import React, { useEffect } from "react";

export default async function useSmoothScroll(route: NextRouter) {
  // const element =
  //   const findEl = async (hash: string, x = 0) => {
  //     const id = String(hash).replace("#", "");
  //     return (
  //       document.getElementById(id) ||
  //       (await new Promise((resolve) => {
  //         if (x > 50) {
  //           return resolve(document.querySelector("#app"));
  //         }
  //         setTimeout(() => {
  //           resolve(findEl(hash, ++x || 1));
  //         }, 100);
  //       }))
  //     );
  //   };
  useEffect(() => {
    const hash = route.pathname.split("#")[1];
    if (hash) {
      const el = document.getElementById(hash);

      if ("scrollBehavior" in document.documentElement.style) {
        return window.scrollTo({
          top: el?.offsetTop,
          behavior: "smooth",
        });
      } else {
        return window.scrollTo(0, el?.offsetTop || 0);
      }
    }
  }, [route.pathname]);

  //   return { x: 0, y: 0 };
}
