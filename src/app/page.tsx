'use client';
import { HelloImg, SkillCard } from "@/blocks";
import { A, BaseProps } from "@/components"
import { useViewport } from "@/hooks";
import { Fragment } from "react";
import { FaFigma, FaSass, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

const HelloText = () => {
  return (
    <div className="body-4">
      <p>
        Меня зовут Даниил(Даня) или как вам удобно. Мой ник — danya_lapka (Даня Лапка). Я фембой, люблю носить чулки, юбочку и другие милые вещички<span className="body-3">❣</span> Фоточки в{`\u0020`}
        <A color="accent-1" target="_blank" href="https://t.me/danya_lapka">Telegram</A>
        . Мне 18 годиков.
      </p>
      <p>
        Я люблю играть в разные игры, например Terraria, Hollow Knight, Dead Cells и другие, посмотреть меня можно на стримах{`\u0020`}
        <A color="accent-1" target="_blank" href="https://www.twitch.tv/danya_lapka">Twitch</A>{`\u0020`}
        или на видео{`\u0020`}
        <A color="accent-1" target="_blank" href="https://www.youtube.com/@DanyaLapka">YouTube</A>.
        В свободноe время я занимаюсь программированием, этот сайт я написал сам :3, вот мой{`\u0020`}
        <A color="accent-1" target="_blank" href="https://github.com/danya-lapka"><FaGithub /> GitHub</A>.
      </p>
      <p>
        <A color="accent-1" target="_blank" href="https://dalink.to/danya_lapka">Поддержать меня ❤</A>
      </p>
    </div>
  )
}
const HelloHeading = () => {
  return (
    <h1 className="heading-1">Всем мяу</h1>
  )
}
const Hello = () => {
  const { width } = useViewport();
  if (width < 768) {
    return (
      <section className="hello-section f-c">
        <div className="hello-text h-min f-r">
          <HelloHeading />
          <HelloImg />
        </div>
        <HelloText />
      </section>
    )
  } else {
    return (
      <section className="hello-section f-r">
        <div className="hello-text h-min f-c gap-48">
          <HelloHeading />
          <HelloText />
        </div>
        <HelloImg />
      </section>
    )
  }

}

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
const SkillsContainer: React.FC<BaseProps> = ({ className }) => {
  return (
    <div className={`skills-container a-start w-100 gap-24 j-center ${className}`}>
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
  )
}

export default function Home() {
  const { width } = useViewport();
  let skillsContainerColumns: string = `ga-columns-`;

  if (width < 768) {
    skillsContainerColumns += 1;
  } else if (width < 1024) {
    skillsContainerColumns += 2;
  } else if (width < 1440) {
    skillsContainerColumns += 2;
  } else if (width < 1920) {
    skillsContainerColumns += 3;
  } else {
    skillsContainerColumns += 3;
  }

  return (
    <Fragment>
      <Hello />
        <section className="skills-section f-c gap-48">
          <h1 className="heading-1">Скиллы <span className="heading-4">так называемые</span></h1>
          <SkillsContainer className={skillsContainerColumns}/>
        </section>
    </Fragment>
  )
}
