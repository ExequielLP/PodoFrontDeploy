import { lazy, Suspense } from "react";
import Loader from "../shared/components/Loader";
const About_info = lazy(() => import("../components/About_info"));

const About = () => {
  return (
    <Suspense fallback={<Loader />}>
      <About_info />
    </Suspense>
  );
};

export default About;
