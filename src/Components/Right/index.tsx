import React from "react";
import Experience from "@/Components/Right/Experience";
import Projects from "@/Components/Right/Projects";
import Footer from "@/Components/Right/footer";
import { getIntroData } from "@/services";
import RichTxtDescription from "@/Components/Right/RichTxtDescription";
import ResumeBtn from "@/Components/Right/ResumeBtn";

const RightComponent = async () => {
  const { aboutMe, techStack } = await getIntroData();
  return (
    <main className={"pt-24 lg:w-1/2 lg:py-24"} id={"content"}>
      <RichTxtDescription aboutMe={aboutMe} techStack={techStack} />
      <Experience />
      <ResumeBtn />
      <Projects />
      <Footer />
    </main>
  );
};

export default RightComponent;
