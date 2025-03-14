import { GitHubLight, LinkedIn } from "developer-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="flex-wrap c-space pt-7 pb-3 border-t gap-5">
      <div className="text-white-500 flex gap-2">
        <p>Terms and Conditions</p>
        <p>|</p>
        <p>Privacy and Policy</p>
      </div>

      <div className="flex gap-3 justify-center">
        <Link
          href="https://github.com/chairielazizi"
          target="_blank"
          className="social-icon"
        >
          <GitHubLight className="w-3/4 h-3/4" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/chairielazizi/"
          target="_blank"
          className="social-icon"
        >
          <LinkedIn className="w-3/4 h-3/4" />
        </Link>
      </div>

      <p className="text-white-500 ">
        &copy; Chairiel, 2025. All rights reserved
      </p>
    </section>
  );
};

export default Footer;
