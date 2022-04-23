import React from "react"
import * as AiIcons from "react-icons/ai"
import * as RiIcons from "react-icons/ri"

const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSLine />,
    iconOpened: <RiIcons.RiArrowUpSLine />,
    subNav: null,
    action: null,
  },
  {
    title: "Compras",
    path: "/compras",
    icon: <RiIcons.RiFileList3Fill />,
    iconClosed: <RiIcons.RiArrowDownSLine />,
    iconOpened: <RiIcons.RiArrowUpSLine />,
    subNav: null,
    action: null,
  },
  {
    title: "Usuarios",
    path: "/usuarios",
    icon: <RiIcons.RiTeamFill />,
    iconClosed: <RiIcons.RiArrowDownSLine />,
    iconOpened: <RiIcons.RiArrowUpSLine />,
    subNav: null,
    action: null,
  },
  {
    title: "Gastos",
    path: "/gastos",
    icon: <RiIcons.RiMoneyDollarBoxFill />,
    iconClosed: <RiIcons.RiArrowDownSLine />,
    iconOpened: <RiIcons.RiArrowUpSLine />,
    subNav: null,
    action: null,
  },
  {
    title: "Ajustes",
    path: "/ajustes",
    icon: <RiIcons.RiSettings2Fill />,
    iconClosed: <RiIcons.RiArrowDownSLine />,
    iconOpened: <RiIcons.RiArrowUpSLine />,
    subNav: null,
    action: null,
  },
  {
    title: "Reportes",
    path: "#",
    icon: <RiIcons.RiBillFill />,
    iconClosed: <RiIcons.RiArrowDownSLine />,
    iconOpened: <RiIcons.RiArrowUpSLine />,
    subNav: [
      {
        title: "Ganancias/pérdidas",
        path: "/reporte/ganancias",
        icon: null,
      },
      {
        title: "Compras",
        path: "/reporte/compras",
        icon: null,
      },
      {
        title: "Ventas",
        path: "/reporte/ventas",
        icon: null,
      },
    ],
    action: null,
  },
  {
    title: "Cerrar sesión",
    path: "/login",
    icon: <RiIcons.RiLogoutBoxRFill />,
    iconClosed: <RiIcons.RiArrowDownSLine />,
    iconOpened: <RiIcons.RiArrowUpSLine />,
    subNav: null,
    action: () => {
      window.localStorage.removeItem("user")
      window.localStorage.removeItem("uuid")
    },
  },
]

export default SidebarData
