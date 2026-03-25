import bgiLogo from '../assets/BGILogo.png'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center gap-4">
      <a href="https://burningglassinstitute.org" target="_blank" rel="noreferrer">
        <img src={bgiLogo} alt="Burning Glass Institute" className="h-10" />
      </a>
      <div>
        <h1 className="text-xl font-bold text-bgi-navy m-0">AI Transformation Framework</h1>
        <p className="text-sm text-gray-500 m-0">Principled AI-driven job redesign</p>
      </div>
    </header>
  )
}
