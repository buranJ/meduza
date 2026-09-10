'use client';

import { useState, type CSSProperties } from 'react';
import { course } from '@/data/course';

const reelStyles = [
  'reel-one',
  'reel-two',
  'reel-three',
  'reel-four',
  'reel-five',
];
const waveform = [
  18, 38, 62, 32, 74, 48, 26, 66, 44, 82, 34, 58, 72, 24, 48, 68, 38, 76, 30,
  54, 84, 42, 64, 26, 46, 72, 34, 60, 80, 40, 56, 28,
];

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="mark">{children}</span>;
}

function EditorMockup() {
  const [playing, setPlaying] = useState(true);
  return (
    <div
      className={`editor-shell ${playing ? 'is-playing' : ''}`}
      aria-label="Макет видеоредактора"
    >
      <div className="editor-topbar">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>PROJECT_01 / REEL_9x16</span>
        <span className="export-state">
          <i /> ГОТОВО К ЭКСПОРТУ
        </span>
      </div>
      <div className="editor-stage">
        <aside className="tool-rail" aria-hidden="true">
          {['МЕДИА', 'ТЕКСТ', 'ЗВУК', 'ЭФФЕКТЫ'].map((item, index) => (
            <span className={index === 1 ? 'active' : ''} key={item}>
              {item}
            </span>
          ))}
        </aside>
        <div className="video-viewport">
          <div className="safe-frame" />
          <span className="viewport-tag">9:16</span>
          <div className="subject-orbit">
            <span>01</span>
          </div>
          <p className="video-caption">
            ПЕРВЫЕ ДВЕ СЕКУНДЫ
            <br />
            <strong>РЕШАЮТ ВСЁ</strong>
          </p>
          <button
            className="play-control"
            type="button"
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? 'Поставить на паузу' : 'Воспроизвести'}
          >
            {playing ? (
              <span className="pause-icon" />
            ) : (
              <span className="play-icon" />
            )}
          </button>
        </div>
        <aside className="inspector">
          <span className="inspector-title">ИНСПЕКТОР</span>
          <dl>
            <div>
              <dt>МАСШТАБ</dt>
              <dd>100%</dd>
            </div>
            <div>
              <dt>ПОЗИЦИЯ</dt>
              <dd>0 · 0</dd>
            </div>
            <div>
              <dt>СКОРОСТЬ</dt>
              <dd>1.0×</dd>
            </div>
            <div>
              <dt>НЕПРОЗР.</dt>
              <dd>100%</dd>
            </div>
          </dl>
        </aside>
      </div>
      <div className="editor-transport">
        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? 'Пауза' : 'Пуск'}
        >
          {playing ? 'Ⅱ' : '▶'}
        </button>
        <span>00:00:0{playing ? '7' : '6'}:18</span>
        <span>/</span>
        <span>00:00:18:00</span>
      </div>
      <div className="timeline-mini">
        <div className="ruler">
          <span>00:00</span>
          <span>00:06</span>
          <span>00:12</span>
          <span>00:18</span>
        </div>
        <div className="playhead">
          <i />
        </div>
        <div className="track">
          <b>ВИДЕО</b>
          <span className="clip clip-a">A001</span>
          <span className="clip clip-b">A002</span>
        </div>
        <div className="track">
          <b>ТЕКСТ</b>
          <span className="clip text-clip">ПЕРВЫЕ ДВЕ СЕКУНДЫ</span>
        </div>
        <div className="track audio-track">
          <b>ЗВУК</b>
          <span className="waveform">
            {waveform.map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProgramTimeline() {
  const [active, setActive] = useState(0);
  const selected = course.modules[active];
  return (
    <div className="program-grid">
      <section className="course-timeline" aria-label="Модули курса">
        <div className="timeline-ruler">
          <span>00:00</span>
          <span>02:00</span>
          <span>04:00</span>
          <span>06:00</span>
        </div>
        {course.modules.map((item, index) => (
          <button
            className={`module-row ${active === index ? 'selected' : ''}`}
            onClick={() => setActive(index)}
            type="button"
            key={item.id}
          >
            <span className="row-label">{item.tag}</span>
            <span
              className={`module-clip ${item.color}`}
              style={{ width: `${item.width}%` }}
            >
              <small>{item.id}</small>
              <strong>{item.title}</strong>
              <i />
            </span>
          </button>
        ))}
      </section>
      <aside className="module-inspector" aria-live="polite">
        <span>СВОЙСТВА / МОДУЛЬ {selected.id}</span>
        <h3>{selected.title}</h3>
        <p>{selected.detail}</p>
        <dl>
          <div>
            <dt>ДОРОЖКА</dt>
            <dd>{selected.tag}</dd>
          </div>
          <div>
            <dt>СТАТУС</dt>
            <dd>В ПРОГРАММЕ</dd>
          </div>
          <div>
            <dt>ПРАКТИКА</dt>
            <dd>ВКЛЮЧЕНА</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}

function BeforeAfter() {
  const [value, setValue] = useState(54);
  const [tab, setTab] = useState('МОНТАЖ');
  return (
    <div className="compare-wrap">
      <div
        className="compare-tabs"
        role="tablist"
        aria-label="Категория сравнения"
      >
        {['МОНТАЖ', 'ЦВЕТ', 'ТЕКСТ', 'ЗВУК'].map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={tab === item}
            onClick={() => setTab(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <div
        className={`compare-frame compare-${tab.toLowerCase()}`}
        style={{ '--split': `${value}%` } as CSSProperties}
      >
        <div className="compare-before">
          <span>ДО</span>
          <p>
            случайный темп
            <br />
            текст поверх кадра
          </p>
        </div>
        <div className="compare-after">
          <span>ПОСЛЕ</span>
          <p>
            точный ритм
            <br />
            текст ведёт взгляд
          </p>
        </div>
        <div className="compare-line" />
        <input
          aria-label="Показать до или после"
          type="range"
          min="8"
          max="92"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />
      </div>
    </div>
  );
}

export default function CourseLanding() {
  return (
    <main>
      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="В начало">
          <span>✣</span>
          {course.brand}
        </a>
        <nav aria-label="Основная навигация">
          <a href="#program">Программа</a>
          <a href="#work">Работы</a>
          <a href="#result">Результат</a>
          <a href="#author">Автор</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="nav-cta" href="#price">
          Начать курс <span>↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            КУРС ПО CAPCUT / 2026 <span>● REC</span>
          </p>
          <h1>
            МОНТИРУЙ ТАК,
            <br />
            ЧТОБЫ РОЛИКИ
            <br />
            <em>досматривали.</em>
          </h1>
          <p className="hero-text">
            Практический курс по монтажу Reels, TikTok и Shorts в CapCut. Без
            сложного софта — с пониманием ритма, кадра, текста и звука.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#program">
              Смотреть программу <span>↓</span>
            </a>
            <a className="text-link" href="#work">
              Посмотреть работы <span>↗</span>
            </a>
          </div>
        </div>
        <EditorMockup />
        <div className="format-list" aria-hidden="true">
          <span>VIDEO</span>
          <span>TEXT</span>
          <span>SFX</span>
          <span>MUSIC</span>
        </div>
      </section>

      <section className="proof" aria-label="Параметры курса">
        <span className="proof-label">PROJECT INFO</span>
        {course.meta.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
        <span className="proof-end">COURSE_01.MP4</span>
      </section>

      <section className="problem section-pad" id="problem">
        <p className="eyebrow">ПОЧЕМУ ОДНИХ ИНСТРУМЕНТОВ МАЛО</p>
        <h2>
          <span className="problem-lead">
            <b>CAPCUT</b> могут
            <br />
            <em>скачать все.</em>
          </span>
          <span className="problem-tail">
            <b>
              Грамотно <br className="mobile-break" />
              смонтировать —
            </b>
            <br />
            далеко не все.
          </span>
        </h2>
        <div className="observations">
          {[
            [
              '01',
              'Ролик начинается слишком медленно',
              'Зритель уже свайпнул, пока вы подходили к сути.',
            ],
            [
              '02',
              'Субтитры выглядят как шаблон',
              'Текст закрывает кадр вместо того, чтобы вести взгляд.',
            ],
            [
              '03',
              'Звук и картинка живут отдельно',
              'Склейка не попадает в акцент, и ролик теряет темп.',
            ],
          ].map(([n, title, text]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="showcase" id="work">
        <div className="section-head">
          <div>
            <p className="eyebrow">MEDIA BIN / SELECTED</p>
            <h2>
              РАБОТЫ, КОТОРЫЕ
              <br />
              <Mark>держат внимание.</Mark>
            </h2>
          </div>
          <p>
            Пять направлений монтажа. Эти рамки готовы принять реальные работы
            автора или учеников.
          </p>
        </div>
        <div className="reel-scroller">
          {reelStyles.map((style, index) => (
            <article className={`reel ${style}`} key={style}>
              <div className="reel-chrome">
                <span>00:{12 + index * 3}</span>
                <span>REEL / 0{index + 1}</span>
              </div>
              <div className="reel-art">
                <span className="reel-word">
                  {['RHYTHM', 'VOICE', 'CUT', 'COLOR', 'STORY'][index]}
                </span>
                <i />
              </div>
              <div className="reel-footer">
                <span>EDIT_0{index + 1}</span>
                <b>▶</b>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="program section-pad" id="program">
        <div className="section-head program-head">
          <div>
            <p className="eyebrow">PROJECT / COURSE_01</p>
            <h2>ПРОГРАММА</h2>
          </div>
          <p>
            Не список уроков, а монтажная последовательность: каждый модуль
            добавляет новую дорожку к финальному ролику.
          </p>
        </div>
        <ProgramTimeline />
      </section>

      <section className="skills section-pad">
        <p className="eyebrow">SKILL STACK / 06</p>
        <div className="skills-head">
          <h2>
            ЧТО БУДЕТ
            <br />В <em>руках.</em>
          </h2>
          <p>
            Не набор эффектов. Система решений, которую можно перенести в любой
            короткий формат.
          </p>
        </div>
        <div className="skill-list">
          {course.skills.map((skill, index) => (
            <article key={skill.name}>
              <span>0{index + 1}</span>
              <h3>{skill.name}</h3>
              <p>{skill.text}</p>
              <i />
            </article>
          ))}
        </div>
      </section>

      <section className="result section-pad" id="result">
        <div className="result-copy">
          <p className="eyebrow">COMPARE / VERSION 01—02</p>
          <h2>
            ДО И<br />
            <em>после.</em>
          </h2>
          <p>
            Потяните линию. Сравнение показывает не «магический пресет», а
            разницу между случайным монтажом и осознанным решением.
          </p>
        </div>
        <BeforeAfter />
      </section>

      <section className="instructor" id="author">
        <div
          className="portrait-placeholder"
          aria-label="Место для портрета автора"
        >
          <span>PORTRAIT / REPLACE</span>
          <div>
            <i />
            <i />
            <i />
          </div>
          <b>9:16</b>
        </div>
        <div className="instructor-copy">
          <p className="eyebrow">WHO / CREATOR</p>
          <h2>
            КТО
            <br />
            <em>стоит за курсом</em>
          </h2>
          <h3>{course.instructor.name}</h3>
          <p>{course.instructor.role}</p>
          <dl>
            <div>
              <dt>ОПЫТ</dt>
              <dd>{course.instructor.experience}</dd>
            </div>
            <div>
              <dt>ПРОЕКТЫ</dt>
              <dd>{course.instructor.projects}</dd>
            </div>
            <div>
              <dt>РЕЗУЛЬТАТЫ</dt>
              <dd>{course.instructor.results}</dd>
            </div>
          </dl>
          <small>
            Замените отмеченные поля на подтверждённые данные автора.
          </small>
        </div>
      </section>

      <section className="fit section-pad">
        <div>
          <span>01 / ТЕБЕ СЮДА</span>
          <h2>
            ЕСЛИ ХОЧЕШЬ
            <br />
            ПОНИМАТЬ, <em>почему</em>
            <br />
            СКЛЕЙКА РАБОТАЕТ.
          </h2>
          <ul>
            <li>Снимаешь на телефон и хочешь собирать ролики сам</li>
            <li>Устал повторять шаблоны без понимания ритма</li>
            <li>Готов практиковаться, а не только смотреть уроки</li>
          </ul>
        </div>
        <div>
          <span>02 / НЕ ТЕБЕ СЮДА</span>
          <h2>
            ЕСЛИ НУЖНА
            <br />
            КНОПКА <em>«вирусно»</em>
            <br />
            БЕЗ ПРАКТИКИ.
          </h2>
          <ul>
            <li>Ищешь гарантии просмотров и быстрые обещания</li>
            <li>Не готов пересобирать работу после разбора</li>
            <li>Нужен курс по сложному киношному софту</li>
          </ul>
        </div>
      </section>

      <section className="pricing section-pad" id="price">
        <div className="price-console">
          <div className="price-top">
            <span>FULL COURSE</span>
            <span>COURSE_01</span>
            <i>● ONLINE</i>
          </div>
          <div className="price-main">
            <div>
              <p>CAPCUT</p>
              <h2>
                ОТ НУЛЯ
                <br />
                ДО <em>REELS</em>
              </h2>
            </div>
            <div className="price-meta">
              {course.meta.slice(0, 4).map((item) => (
                <span key={item.label}>
                  {item.value === '∞' ? 'навсегда' : item.value}{' '}
                  {item.value === '∞' ? 'доступ' : item.label}
                </span>
              ))}
            </div>
            <div className="price-buy">
              <small>СТОИМОСТЬ</small>
              <strong>{course.offer.price}</strong>
              <a href="mailto:course@example.com">
                Начать курс <span>→</span>
              </a>
            </div>
          </div>
          <p className="price-note">{course.offer.note}</p>
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <div>
          <p className="eyebrow">HELP / 06</p>
          <h2>
            ЧАСТЫЕ
            <br />
            <em>вопросы.</em>
          </h2>
        </div>
        <div className="faq-list">
          {course.faq.map(([question, answer], index) => (
            <details key={question}>
              <summary>
                <span>0{index + 1}</span>
                {question}
                <i>+</i>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div>
          <p className="eyebrow">EXPORT / READY</p>
          <h2>
            СЛЕДУЮЩИЙ
            <br />
            РОЛИК ТЫ
            <br />
            <em>смонтируешь иначе.</em>
          </h2>
          <a href="#price">
            Начать курс <span>↗</span>
          </a>
        </div>
        <div className="end-timeline" aria-hidden="true">
          <span>V1</span>
          <i />
          <i />
          <i />
          <b />
        </div>
      </section>

      <footer id="legal">
        <a className="wordmark" href="#top">
          <span>✣</span>
          {course.brand}
        </a>
        <p>Независимый образовательный проект. Не аффилирован с CapCut.</p>
        <div>
          <a href="#legal">Оферта</a>
          <a href="#legal">Политика</a>
          <span>© 2026</span>
        </div>
      </footer>
      <a className="mobile-cta" href="#price">
        НАЧАТЬ КУРС <span>→</span>
      </a>
    </main>
  );
}
