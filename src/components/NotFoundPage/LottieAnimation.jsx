import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

function LottieAnimation() {
  const animationContainer = useRef(null);

  useEffect(() => {
    fetch("/Animation.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const animation = lottie.loadAnimation({
          container: animationContainer.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: data,
        });

        return () => animation.destroy(); // Clean up the animation on component unmount
      })
      .catch((error) => {
        console.error("Problem fetching the animation data:", error);
      });
  }, []);

  return (
    <div
      ref={animationContainer}
      style={{ width: 1024, height: 1024, margin: "auto" }}
    ></div>
  );
}

export default LottieAnimation;
