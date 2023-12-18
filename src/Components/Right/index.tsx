import React from "react";
import RichTxtDescription from "@/Components/Right/RichTxtDescription";
import Experience from "@/Components/Right/Experience";
import Projects from "@/Components/Right/Projects";
import Footer from "@/Components/Right/footer";

const RightComponent = () => {
  return (
    <main>
      <RichTxtDescription />
      <Experience />
      <div>Download Resume</div>
      <Projects />
      <Footer />
    </main>
  );
};

export default RightComponent;
