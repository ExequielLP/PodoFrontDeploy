import { lazy, Suspense } from "react";
import useTitle from "./../hooks/useTitle";
import Loader from "../shared/components/Loader";
const About_info = lazy(() => import("../components/About_info"));

const About = () => {
  useTitle({ title: "Sobre Pedicuría LP" });
  return (
    <Suspense fallback={<Loader />}>
      <About_info />
    </Suspense>
  );
};

export default About;
