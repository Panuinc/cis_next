export default function UiLayout({ children }) {
  return (
    <div className="flex flex-row items-start justify-start w-full min-h-screen">
      <div className="flex flex-row items-center justify-center w-[25%] min-h-screen gap-2 fixed">
        <div className="flex flex-col items-center justify-center w-[25%] min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed">
          Main Menu
        </div>
        <div className="flex flex-col items-center justify-center w-[75%] min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed">
          Sub Menu
        </div>
      </div>

      <div className="flex flex-col items-center justify-start w-[75%] min-h-screen ml-[26%] gap-4">
        <div className="flex flex-row items-center justify-center w-[100%] h-full p-2 gap-2 border-2 border-[#000000] border-dashed">
          Header
        </div>
        <div className="flex flex-row items-center justify-center w-[100%] min-h-screen p-2 gap-2 border-2 border-[#000000] border-dashed rounded-3xl">
          Contents
        </div>
      </div>
    </div>
  );
}
