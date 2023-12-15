import Image from 'next/image'

export default function Home() {
    return (
        <main className="flex flex-col gap-4 p-24 h-screen justify-center">
            <span className={"font-mono text-orange-600"}>Hi, my name is</span>
            <span className={"text-7xl font-extrabold text-white"}>Sanchit Bhatnagar.</span>
            <span className={"text-6xl font-bold text-slate-600"}>I build things for the web.</span>
        </main>
    )
}
