
const Footer = () => {
  return (
    <footer className=" md:bottom-0 navbar text-black w-[92%] m-auto  mt-12 p-8 rounded-2xl bottom-0 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left bottom-0">
        {/* Column 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Community</h3>
          <ul className="space-y-2">
            <li>
              <a href="#">Forums</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a href="#">Newsletter</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Optional: Copyright */}
      <div className="mt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Poudel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
