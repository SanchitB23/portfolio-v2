import LeftComponent from "@/Components/Left";
import RightComponent from "@/Components/Right";

export default function Home() {
  return (
    <div className="lg:flex lg:justify-between lg:gap-4">
      <LeftComponent />
      <RightComponent />
    </div>
  );
}
