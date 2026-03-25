export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-4 text-xs text-gray-400">
      &copy; {new Date().getFullYear()} Burning Glass Institute. All rights reserved.
      {' '}Data and methodology:{' '}
      <a href="https://burningglassinstitute.org" className="underline hover:text-gray-600">
        burningglassinstitute.org
      </a>
    </footer>
  )
}
