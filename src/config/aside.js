import { BiHomeCircle, BiHash } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { HiOutlineUser, HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import { RiFileList2Line } from "react-icons/ri";
import { AiOutlineTwitter } from "react-icons/ai";
import { MdExitToApp } from "react-icons/md";

export const asideItems = [
  {
    icon: <AiOutlineTwitter />,
    href: "/",
  },
  {
    icon: <BiHomeCircle />,
    text: "Inicio",
    href: "/",
  },
  {
    icon: <BiHash />,
    text: "Explorar",
  },
  {
    icon: <IoIosNotifications />,
    text: "Notificaciones",
  },
  {
    icon: <FiMail />,
    text: "Mensajes",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" height="25px">
        <g>
          <path
            fill="#FFF"
            d="M19.9 23.5c-.157 0-.312-.05-.442-.144L12 17.928l-7.458 5.43c-.228.164-.53.19-.782.06-.25-.127-.41-.385-.41-.667V5.6c0-1.24 1.01-2.25 2.25-2.25h12.798c1.24 0 2.25 1.01 2.25 2.25v17.15c0 .282-.158.54-.41.668-.106.055-.223.082-.34.082zM12 16.25c.155 0 .31.048.44.144l6.71 4.883V5.6c0-.412-.337-.75-.75-.75H5.6c-.413 0-.75.338-.75.75v15.677l6.71-4.883c.13-.096.285-.144.44-.144z"
          ></path>
        </g>
      </svg>
    ),
    text: "Guardados",
  },
  {
    icon: <RiFileList2Line />,
    text: "Listas",
  },
  {
    icon: <HiOutlineUser />,
    text: "Perfil",
  },
  {
    icon: <MdExitToApp />,
    text: "Salir",
  },
];
