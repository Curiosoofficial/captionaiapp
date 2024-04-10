import SparklesIcon from "./SparklesIcon";

export default function DemoSection() {
    return(
        <section className="flex justify-around mt-12 items-center">
        <video autoPlay loop muted className="w-[270px] h-[480px] rounded-3xl">
          <source src="/assets/before.mp4"/>
        </video>

        <div>
          <SparklesIcon />
        </div>

        <video autoPlay loop muted className="w-[270px] h-[480px] rounded-3xl">
          <source src="/assets/after.mp4"/>
        </video>
      </section>
    )
}