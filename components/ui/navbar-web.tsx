
export default function NavbarWeb() {
  return (
    <>
    <nav className="w-full h-16 flex items-center justify-between px-4 mt-3">
        <div className="flex items-center justify-between w-full">
            <div>
                <h1 className="text-[#064E3B] font-black text-4xl">
                    Na Xhue
                </h1>
            </div>
            <div className=" flex gap-2">
                <div className="px-4 py-2">
                    <h2 className="text-[#57534E] font-light text-xl px-2 py-2 hover:cursor-pointer">
                        Log In
                    </h2>
                </div>
                <div className=" bg-[#364A29] rounded-lg px-4 py-2 m-2 hover:bg-[#2B3A1F] transition duration-300 transform hover:scale-105 hover:cursor-pointer">
                    <button className="text-white font-bold text-m hover:cursor-pointer" >
                    Join Network

                    </button>
                </div>
            </div>
        </div>
    </nav>
    
    </>
  )
}
