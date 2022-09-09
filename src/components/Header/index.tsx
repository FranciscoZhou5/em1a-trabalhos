import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiGithub, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/auth.context";

const blackList = ["/"];

export default function Header() {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  const router = useRouter();
  const auth = useAuth();

  const githubLink = "https://github.com/Francisco5g/trabalhos-classe";
  const currentPath = router.pathname;
  const links = [
    { title: "Mural", path: "/app" },
    { title: "Materiais", path: "/app/materials" },
  ];

  function toggleDropdown() {
    // setShowDropdownMenu((old) => !old);
  }

  return blackList.includes(currentPath) ? (
    <></>
  ) : (
    <header className="bg-black h-14 flex flex-row items-center px-6 md:px-8 lg:px-16 border-b-gray100 border-b">
      <div className="border-dashed border-gray border-2 px-3 rounded-md">
        <span> Logo </span>
      </div>

      <nav className="mx-auto">
        {links.map((l) => (
          <Link passHref href={l.path} key={l.path}>
            <a className={`${currentPath === l.path ? "text-white" : "text-weak"} mx-2 cursor-pointer`}>{l.title}</a>
          </Link>
        ))}
      </nav>

      <div>
        <div className="relative">
          <button onClick={toggleDropdown} className="flex focus:outline-none">
            <FiUser size={24} className="text-weak hover:text-normal cursor-pointer duration-200" />
          </button>

          <div
            className={`${
              showDropdownMenu ? "opacity-100" : "opacity-0"
            } mt-2 absolute bg-black border-gray100 border rounded-md w-52 right-0 z-10`}
          >
            <div className="">
              <div className="border-b border-gray100 py-1 px-3">
                <strong>Olá, {auth.user.name}!</strong>
              </div>

              <div className="py-1 px-3 hover:bg-gray100 cursor-pointer">Logout</div>
            </div>
          </div>
        </div>
        {/* <Link passHref href={githubLink}>
          <a className="text-weak rounded-full hover:text-normal cursor-pointer duration-200" target="_blank">
          </a>
        </Link> */}
      </div>
    </header>
  );
}
