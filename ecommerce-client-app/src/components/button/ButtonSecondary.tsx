export default function ButtonSecondary({children, onClick, type}: any) {
    
    return(
        <button
                className="bg-white text-gray-900 px-9 py-2 flex justify-center items-center rounded-md border border-gray-950 hover:border-amber-900 mr-4"
                onClick={onClick}
                type={type}
              >
                {children}
              </button>
    )
}