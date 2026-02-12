const Beacon = () => {
    return (
        <div className="relative">
            <div className="absolute -inset-1 animate-ping">
                <div className="w-4 h-4 bg-[#FFD93D] border-3 border-black rounded-full opacity-75"></div>
            </div>
            <div className="relative w-4 h-4 bg-[#FF6B6B] border-3 border-black rounded-full
                    hover:scale-150 transition-transform duration-300 cursor-pointer
                    shadow-[2px_2px_0_#000]">
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-white border-2 border-black rounded-full"></span>
            </div>
        </div>
    )
};

export default Beacon;