const Header = () => {
  const handlerClick = () => { 
    document.cookie = 'sessiontoken=; Max-Age=0;'
    localStorage.clear()
    
    window.location.reload()
  }

  return (
    <header className="w-full h-16 shadow-gray-700 shadow-sm rounded-b-lg flex justify-end items-center">
      <button className="mr-12 text-md bg-gray-400 p-2 rounded-lg font-semibold text-gray-800 border-2 border-solid border-gray-500 transition-colors duration-300 ease-in-out hover:bg-gray-500 hover:text-gray-900" onClick={handlerClick}>Logout</button>
    </header>
  )
}

export { Header }