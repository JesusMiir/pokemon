import { useEffect } from "react";

// export const useScrollWheel = () => {
//   const [scrollDirection, setScrollDirection] = useState<null | "up" | "down">(
//     null
//   );

//   document.addEventListener("wheel", (e: WheelEvent) => {
//     const windowBottom = window.scrollY + window.innerHeight;
//     console.log(windowBottom, document.body.offsetHeight);
//     setScrollDirection(e.deltaY < 0 ? "up" : "down");
//   });

//   return {
//     scrollDirection,
//   };
// };

// const onScrollToBottom = (callback: Function) => {
//   document.addEventListener("wheel", (e: WheelEvent) => {
//     const windowBottom = window.scrollY + window.innerHeight;
//     // Within 100 pixels of the bottom
//     if (document.body.offsetHeight - windowBottom < 100) {
//       callback();
//     }
//   });
// };

/*
    When state updates, what happens to the components that use it?
        1. the state is changed
        2. They are destroyed (removed from the DOM)
        3. The are re-rendered (put back in the DOM)
*/

export const useBottomScroll = (callback: Function) => {
  const handleBottomScroll = () => {
    const windowBottom = window.scrollY + window.innerHeight;
    // Within 100 pixels of the bottom
    // console.log(document.body.offsetHeight - windowBottom);
    if (document.body.offsetHeight - windowBottom < 100) {
      callback();
    }
  };

  // On destroy / cleanup
  // If we don't destroy, it will keep adding event listeners to the DOM
  // For example, if your component has updated 20 times, then handleBottomScroll would be called 20 times every time who move the wheel
  useEffect(() => {
    document.addEventListener("wheel", handleBottomScroll);
    return () => {
      document.removeEventListener("wheel", handleBottomScroll);
    };
  });
};
