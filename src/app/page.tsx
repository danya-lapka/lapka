import { A } from "@/components"
import { Fragment } from "react";

export default function Home() {

  return (
    <Fragment>
      <section className="hello-section f-r">
        <div className="hello-text h-min">
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
              <A color="accent-1" target="_blank" href="https://github.com/danya-lapka">GitHub</A>.
            </p>
            <p>
              <A color="accent-1" target="_blank" href="https://dalink.to/danya_lapka">Поддержать меня ❤</A>
            </p>
          </div>
        </div>
        <img src="/hello-image.png" alt="boykisser"/>
      </section>
      <section className="skills-section">
        <h1 className="heading-1">Скиллы <span className="heading-4">так называемые</span></h1>
      </section>
    </Fragment>
  );
}
