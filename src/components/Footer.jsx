const Footer = () => {
  return (
    <div>
      <footer className="bg-zinc-800 text-white">
        <div className="text-center pt-14 pb-4">
          &copy; {new Date().getFullYear()} Vasyl Miskiv
        </div>
      </footer>
    </div>
  );
};

export default Footer;
