export default function ButtonPrimary({ children, onClick, type }: any) {
    return (
      <button
        className="bg-gray-900 text-white px-9 w-fit py-2 rounded-md hover:bg-gray-800"
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  }