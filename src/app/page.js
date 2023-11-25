import DemoSection from "@/components/DemoSection";
import PageHeaders from "@/components/PageHeaders";
import UploadIcon from "@/components/Uploadicon";

export default function Home() {
  return (
    <>
    <div>
      <PageHeaders
        h1Text={'Add epic captions to your videos'}
        h2Text={'Just upload your video and we will do the rest'}
      />
      <div className="text-center">
        <button className="bg-green-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-900">
          <UploadIcon />
          <span>Choose File</span>
        </button>
      </div>

      <DemoSection />
    </div>
    </>
  );
}
