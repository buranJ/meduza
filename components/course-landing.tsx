'use client';

import Image from 'next/image';
import { useRef, useState, type CSSProperties } from 'react';
import { course } from '@/data/course';

const portfolioReels = [
  'GaR6f_G52NA',
  'Dgksh0dudyY',
  'IVooWGppgas',
  '2k9A6nURH34',
  'SNiVB7hoi0U',
];
const whatsappUrl = 'https://wa.me/996555180868';
const waveform = [
  18, 38, 62, 32, 74, 48, 26, 66, 44, 82, 34, 58, 72, 24, 48, 68, 38, 76, 30,
  54, 84, 42, 64, 26, 46, 72, 34, 60, 80, 40, 56, 28,
];

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="mark">{children}</span>;
}

function PortfolioSlider() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const updateControls = () => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    setCanScrollBack(scroller.scrollLeft > 2);
    setCanScrollForward(scroller.scrollLeft < maxScrollLeft - 2);
  };

  const scrollPortfolio = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    scroller.scrollBy({
      left: direction * Math.min(scroller.clientWidth * 0.82, 720),
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="section-head work-head">
        <div>
          <h2>
            РАБОТЫ, КОТОРЫЕ
            <br />
            <Mark>держат внимание.</Mark>
          </h2>
        </div>
        <div className="showcase-controls">
          <span>05 / SHORTS</span>
          <button
            type="button"
            onClick={() => scrollPortfolio(-1)}
            disabled={!canScrollBack}
            aria-label="Предыдущие ролики"
            aria-controls="portfolio-reels"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollPortfolio(1)}
            disabled={!canScrollForward}
            aria-label="Следующие ролики"
            aria-controls="portfolio-reels"
          >
            →
          </button>
        </div>
      </div>
      <div
        className="reel-scroller"
        id="portfolio-reels"
        ref={scrollerRef}
        onScroll={updateControls}
        aria-label="Работы Жибек Мурзабековой"
      >
        {portfolioReels.map((videoId, index) => (
          <article className="reel" key={videoId}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0`}
              title={`Работа Жибек Мурзабековой — ролик ${index + 1}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </article>
        ))}
      </div>
    </>
  );
}

function EditorMockup() {
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const togglePlayback = () => {
    const nextPlaying = !playing;

    videoRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: nextPlaying ? 'playVideo' : 'pauseVideo',
        args: [],
      }),
      'https://www.youtube.com',
    );
    setPlaying(nextPlaying);
  };

  return (
    <div
      className={`editor-shell ${playing ? 'is-playing' : ''}`}
      aria-label="Ролик в макете видеоредактора"
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
          <iframe
            ref={videoRef}
            className="hero-video"
            src="https://www.youtube.com/embed/C6CZEmOgpUw?autoplay=1&mute=1&loop=1&playlist=C6CZEmOgpUw&controls=0&playsinline=1&rel=0&enablejsapi=1"
            title="Ролик Жибек Мурзабековой"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <button
            className="play-control"
            type="button"
            onClick={togglePlayback}
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
          onClick={togglePlayback}
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
        {['МОНТАЖ', 'ЦВЕТ', 'ТЕКСТ'].map((item) => (
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
        <a
          className="nav-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
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
        <div className="problem-panel">
          <div className="problem-bar">
            <p className="eyebrow">ПОЧЕМУ ОДНИХ ИНСТРУМЕНТОВ МАЛО</p>
            <span>03 / COMMON EDITING ERRORS</span>
          </div>
          <h2>
            <span className="problem-lead">
              <small>ДОСТУПНОСТЬ</small>
              <b>CAPCUT</b>
              <em>могут скачать все.</em>
            </span>
            <span className="problem-symbol" aria-hidden="true">
              ≠
            </span>
            <span className="problem-tail">
              <small>НАВЫК</small>
              <b>Грамотно смонтировать —</b>
              <em>далеко не все.</em>
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
        </div>
      </section>

      <section className="showcase" id="work">
        <PortfolioSlider />
      </section>

      <section className="program section-pad" id="program">
        <div className="section-head program-head">
          <div>
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
        <div className="instructor-portrait">
          <Image
            src="/mentor-zhibek.jpg"
            alt="Жибек Мурзабекова — режиссёр, оператор и монтажёр"
            width={853}
            height={1280}
            sizes="(max-width: 780px) 100vw, 50vw"
            unoptimized
          />
          <span>MENTOR / ZHIBEK</span>
          <b>07+ YEARS</b>
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
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
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
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
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
      <a
        className="mobile-cta"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
      >
        НАЧАТЬ КУРС <span>→</span>
      </a>
    </main>
  );
}
