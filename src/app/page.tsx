import { HelloImg, SkillCard } from "@/blocks";
import { A } from "@/components"
import { Fragment } from "react";
import { FaFigma, FaSass, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";


export default function Home() {

  const skills: {
    name: string,
    icon: React.ReactNode,
    description: string
  }[] = [
    {
      name: 'Next.js',
      icon: <SiNextdotjs />,
      description: 'Next.js — это React-фреймворк для создания быстрых веб-приложений со встроенным серверным рендерингом и статической генерацией.'
    },
    {
      name: 'Sass',
      icon: <FaSass />,
      description: 'Sass — это надстройка над CSS, которая добавляет переменные, вложенность и миксины, делая стили мощнее и поддерживаемее.'
    },
    {
      name: 'TypeScript',
      icon: <SiTypescript />,
      description: 'TypeScript — это JavaScript с типами для надёжности и лучшей поддержки кода.'
    },
    {
      name: 'Figma',
      icon: <FaFigma />,
      description: 'Figma — это облачный редактор для дизайна интерфейсов и прототипирования с возможностью совместной работы в реальном времени.'
    }
  ]

  return (
    <Fragment>
      <section className="hello-section f-r">
        <div className="hello-text h-min f-c gap-48">
          <h1 className="heading-1">Всем мяу</h1>
          <div className="body-4">
            <p>
              Меня зовут Даниил(Даня) или как вам удобно. Мой ник — danya_lapka (Даня Лапка). Я фембой, люблю носить чулки, юбочку и другие милые вещички<span className="body-3">❣</span> Фоточки в 
              <A color="accent-1" target="_blank" href="https://t.me/danya_lapka">Telegram</A>
              . Мне 18 годиков.
            </p>
            <p>
              Я люблю играть в разные игры, например Terraria, Hollow Knight, Dead Cells и другие, посмотреть меня можно на стримах 
              <A color="accent-1" target="_blank" href="https://www.twitch.tv/danya_lapka">Twitch</A> 
              или на видео 
              <A color="accent-1" target="_blank" href="https://www.youtube.com/@DanyaLapka">YouTube</A>. 
              В свободноe время я занимаюсь программированием, этот сайт я написал сам :3, вот мой 
              <A color="accent-1" target="_blank" href="https://github.com/danya-lapka"><FaGithub /> GitHub</A>.
            </p>
            <p>
              <A color="accent-1" target="_blank" href="https://dalink.to/danya_lapka">Поддержать меня ❤</A>
            </p>
          </div>
        </div>
        <HelloImg />
      </section>
      <section className="skills-section f-c gap-48">
        <h1 className="heading-1">Скиллы <span className="heading-4">так называемые</span></h1>
        <div className="skills-container ga-columns-3 a-start w-100 gap-24 j-center">
          {skills.map((i) => {
            return (
              <SkillCard key={i.name}> 
                <SkillCard.Name>
                  <SkillCard.Icon>{i.icon}</SkillCard.Icon>
                  {i.name}
                </SkillCard.Name>
                <SkillCard.Description>{i.description}</SkillCard.Description>
              </SkillCard>
            );
          })}
        </div>
      </section>
    </Fragment>
  );
}
