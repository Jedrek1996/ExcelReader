const Header = () => {
  return (
    <>
      <div className="flex justify-center text-center font-bold text-5xl italic ">
        CSV Reader
      </div>
      <div className="flex flex-col items-center justify-evenly text-center text-sm mt-4 italic font-semibold">
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
