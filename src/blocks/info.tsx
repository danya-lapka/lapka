import { FaTelegram, FaTwitch, FaYoutube, FaGithubSquare, FaDiscord } from "react-icons/fa"

const pages: {
  name: string,
  href: string
}[] = [
    {
      name: "Ссылки",
      href: "/links"
    },
    {
      name: "Таблица",
      href: "/table"
    }
  ]

const links: {
  name: string,
  href: string,
  icon: React.ReactNode,
  tooltip?: string
}[] = [
    {
      name: "Telegram",
      href: "https://t.me/danya_lapka",
      icon: <FaTelegram />,
      tooltip: "Фоточки там и всякие новости"
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@DanyaLapka",
      icon: <FaYoutube />,
      tooltip: "Видео, записи стримов, нарезки"
    },
    {
      name: "Twitch",
      href: "https://www.twitch.tv/danya_lapka",
      icon: <FaTwitch />,
      tooltip: "Стримы крутые очень"
    },
    {
      name: "Discord",
      href: "https://discord.gg/wUexGQSy6P",
      icon: <FaDiscord />,
      tooltip: "Оповещения о стримах, общение"
    },
    {
      name: "GitHub",
      href: "https://github.com/danya-lapka",
      icon: <FaGithubSquare />,
      tooltip: "Гитхаб, потому что я крутой"
    },
  ]

export { pages, links }