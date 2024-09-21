const Header = () => {
  return (
    <>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent text-center">
        CSV Reader
      </h1>

      <div className="flex flex-col items-center justify-evenly text-center text-[10px] mt-1 italic font-semibold">
        <a
          href="https://github.com/Jedrek1996/ExcelReader"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-indigo-200 transition duration-200"
        >
          Github URL
        </a>
        <p>Developed by:&nbsp; Jedrek</p>
      </div>
    </>
  );
};

export default Header;
