import React from "react";
import Image from "next/image";

import { FaGithub, FaRegCopyright } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 w-full border-t">
      <div className="w-10/12 mx-auto py-6">
        <ul className="flex justify-around flex-wrap items-stretch text-center">
          <li className="flex justify-center my-auto min-w-150">
            <i className="mr-2 my-auto">
              <FaRegCopyright className="far" />
            </i>
            {new Date().getFullYear()} - K'Anime
          </li>
          <li className="my-auto min-w-150">
            <a href="https://github.com/thomas-gleizes/K-Anime" target="_blank">
              <div className="flex justify-center">
                <i className="my-auto mr-2">
                  <FaGithub size={24} />
                </i>
                <span>Github</span>
              </div>
            </a>
          </li>
          <li className="my-auto min-w-150">
            <a href="https://react.org" target="_blank">
              <div className="flex justify-center">
                <Image src="/icon/react.png" width={40} height={40} />
                <span className="ml-2 my-auto">ReactJS</span>
              </div>
            </a>
          </li>
          <li className="my-auto min-w-150">
            <a href="https://vercel.com" target="_blank">
              <Image src="/icon/tailwindcss.png" width={120} height={15} />
            </a>
          </li>
          <li className="my-auto min-w-150">
            <a href="https://nextjs.org/" target="_blank">
              <Image src="/icon/next.png" width={80} height={40} />
            </a>
          </li>
          <li className="my-auto min-w-150">
            <a href="https://vercel.com" target="_blank">
              <Image src="/icon/vercel.png" width={90} height={50} />
            </a>
          </li>
          <li className="my-auto min-w-150">
            <a href="https://expressjs.com" target="_blank">
              <Image src="/icon/express.png" width={130} height={40} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
