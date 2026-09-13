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
const planWhatsAppUrl = (plan: string) =>
  `${whatsappUrl}?text=${encodeURIComponent(
    `Здравствуйте! Хочу подробнее узнать о тарифе «${plan}».`,
  )}`;
const waveform = [
  18, 38, 62, 32, 74, 48, 26, 66, 44, 82, 34, 58, 72, 24, 48, 68, 38, 76, 30,
  54, 84, 42, 64, 26, 46, 72, 34, 60, 80, 40, 56, 28,
];

const skillExplanations: Record<string, string> = {
  HOOK: 'Научишься начинать ролик с кадра, фразы или действия, которое сразу создаёт интригу и удерживает зрителя в первые секунды.',
  CUT: 'Разберёшь, где резать кадр, чтобы переход ощущался естественно и сохранял темп истории.',
  CAPTIONS: 'Поймёшь, как размещать текст в кадре, выделять главное и не перекрывать важные детали видео.',
  SOUND: 'Научишься сводить голос, музыку и акценты так, чтобы звук усиливал кадр, а не спорил с ним.',
  COLOR: 'Соберёшь единый цвет ролика и разберёшься, какие настройки нужны вместо случайных фильтров.',
  STORY: 'Научишься выстраивать понятный сюжет: завязка, развитие и финальная мысль — даже в коротком формате.',
};

const disableYoutubeCaptions = (frame: HTMLIFrameElement) => {
  frame.contentWindow?.postMessage(
    JSON.stringify({
      event: 'command',
      func: 'unloadModule',
      args: ['captions'],
    }),
    'https://www.youtube.com',
  );
};

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="mark">{children}</span>;
}

/*
function LogoLab() {
  return (
    <section className="logo-lab" aria-labelledby="logo-lab-title">
      <div className="logo-lab-head">
        <div>
          <h2 id="logo-lab-title">
            ВАРИАНТЫ
            <br />
            <em>meduza.</em>
          </h2>
        </div>
        <p>Выберите номер варианта — поставлю его в шапку сайта.</p>
      </div>
      <div className="logo-variants">
        <article className="logo-variant variant-one">
          <span>MONOGRAM</span>
          <div className="lab-logo logo-one">
            <b>m</b>
            <strong>meduza</strong>
          </div>
          <p>Символ + чистое имя</p>
        </article>
        <article className="logo-variant variant-two">
          <span>CUT TYPE</span>
          <div className="lab-logo logo-two">
            <strong>medu</strong>
            <i />
            <em>za</em>
          </div>
          <p>Знак склейки в слове</p>
        </article>
        <article className="logo-variant variant-three">
          <span>FRAME</span>
          <div className="lab-logo logo-three">
            <strong>MEDU</strong>
            <em>ZA</em>
            <i />
          </div>
          <p>Контрастный редакторский</p>
        </article>
        <article className="logo-variant variant-four">
          <span>SIGNATURE</span>
          <div className="lab-logo logo-four">
            <strong>medu</strong>
            <em>za</em>
            <i>✦</i>
          </div>
          <p>Мягкий авторский знак</p>
        </article>
        <article className="logo-variant variant-five">
          <span>TIMECODE</span>
          <div className="lab-logo logo-five">
            <i>00:16</i>
            <strong>meduza</strong>
            <b>REC</b>
          </div>
          <p>Лого как часть таймлайна</p>
        </article>
      </div>
    </section>
  );
}
*/

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
              src={`https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0&enablejsapi=1&cc_load_policy=0&iv_load_policy=3`}
              title={`Работа Жибек Мурзабековой — ролик ${index + 1}`}
              loading="lazy"
              onLoad={(event) => disableYoutubeCaptions(event.currentTarget)}
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
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const toggleSound = () => {
    const nextMuted = !muted;

    videoRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: nextMuted ? 'mute' : 'unMute',
        args: [],
      }),
      'https://www.youtube.com',
    );
    setMuted(nextMuted);
  };

  return (
    <div className="editor-shell is-playing" aria-label="Ролик в макете видеоредактора">
      <div className="editor-topbar">
        <span className="window-dots">
          <i />
          <i />
          <i />
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
            src="https://www.youtube.com/embed/C6CZEmOgpUw?autoplay=1&mute=1&loop=1&playlist=C6CZEmOgpUw&controls=0&playsinline=1&rel=0&enablejsapi=1&cc_load_policy=0&iv_load_policy=3"
            title="Ролик Жибек Мурзабековой"
            onLoad={(event) => disableYoutubeCaptions(event.currentTarget)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <button
            className="sound-control"
            type="button"
            onClick={toggleSound}
            aria-label={muted ? 'Включить звук' : 'Выключить звук'}
            aria-pressed={!muted}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
              {muted ? (
                <path d="m16 9 5 6m0-6-5 6" />
              ) : (
                <path d="M16 8c1.7 2.2 1.7 5.8 0 8m3-11c3.5 3.8 3.5 10.2 0 14" />
              )}
            </svg>
            <span>{muted ? 'ЗВУК' : 'ВКЛ.'}</span>
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
          <span className="clip clip-a" />
          <span className="clip clip-b" />
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
              <strong>{item.title}</strong>
              <i />
            </span>
          </button>
        ))}
      </section>
      <aside className="module-inspector" aria-live="polite">
        <span>СВОЙСТВА МОДУЛЯ</span>
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
          <div className="compare-video">
            <iframe
              src="https://www.youtube.com/embed/WsiSnJgH9qs?autoplay=1&mute=1&loop=1&playlist=WsiSnJgH9qs&controls=0&playsinline=1&rel=0&enablejsapi=1&cc_load_policy=0&iv_load_policy=3"
              title="Ролик до монтажа"
              onLoad={(event) => disableYoutubeCaptions(event.currentTarget)}
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <span>ДО</span>
          <p>
            случайный темп
            <br />
            текст поверх кадра
          </p>
        </div>
        <div className="compare-after">
          <div className="compare-video">
            <iframe
              src="https://www.youtube.com/embed/8hn0dmSqtx0?autoplay=1&mute=1&loop=1&playlist=8hn0dmSqtx0&controls=0&playsinline=1&rel=0&enablejsapi=1&cc_load_policy=0&iv_load_policy=3"
              title="Ролик после монтажа"
              onLoad={(event) => disableYoutubeCaptions(event.currentTarget)}
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="В начало">
          <span className="logo-symbol" aria-hidden="true">
            <b>m</b>
            <i />
          </span>
          <span className="logo-name">
            medu<em>za</em>
          </span>
          <span className="logo-label">CUT LAB</span>
        </a>
        <nav
          className={menuOpen ? 'is-open' : ''}
          id="main-navigation"
          aria-label="Основная навигация"
        >
          <a href="#program" onClick={() => setMenuOpen(false)}>
            Программа
          </a>
          <a href="#work" onClick={() => setMenuOpen(false)}>
            Работы
          </a>
          <a href="#result" onClick={() => setMenuOpen(false)}>
            Результат
          </a>
          <a href="#author" onClick={() => setMenuOpen(false)}>
            Автор
          </a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>
            FAQ
          </a>
        </nav>
        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          <span />
          <span />
        </button>
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
      </section>

      {/* <LogoLab /> */}

      <section className="proof" aria-label="Параметры курса">
        {course.meta.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="problem section-pad" id="problem">
        <div className="problem-panel">
          <div className="problem-bar">
            <p className="eyebrow">ПОЧЕМУ ОДНИХ ИНСТРУМЕНТОВ МАЛО</p>
          </div>
          <h2>
            <span className="problem-lead">
              <b>CAPCUT</b>
              <em>могут скачать все.</em>
            </span>
            <span className="problem-symbol" aria-hidden="true">
              ≠
            </span>
            <span className="problem-tail">
              <b>Грамотно смонтировать —</b>
              <em>далеко не все.</em>
            </span>
          </h2>
          <div className="observations">
            {[
              [
                'Ролик начинается слишком медленно',
                'Зритель уже свайпнул, пока вы подходили к сути.',
              ],
              [
                'Субтитры выглядят как шаблон',
                'Текст закрывает кадр вместо того, чтобы вести взгляд.',
              ],
              [
                'Звук и картинка живут отдельно',
                'Склейка не попадает в акцент, и ролик теряет темп.',
              ],
            ].map(([title, text]) => (
              <article key={title}>
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
        </div>
        <ProgramTimeline />
      </section>

      <section className="skills section-pad">
        <div className="skills-head">
          <h2>
            ЧЕМУ НАУЧИШЬСЯ
            <br />НА <em>КУРСЕ.</em>
          </h2>
          <p>
            Не набор эффектов. Система решений, которую можно перенести в любой
            короткий формат.
          </p>
        </div>
        <div className="skill-list">
          {course.skills.map((skill) => (
            <details key={skill.name}>
              <summary>
                <h3>{skill.name}</h3>
                <p>{skill.text}</p>
                <i aria-hidden="true" />
              </summary>
              <div className="skill-explanation">
                <p>{skillExplanations[skill.name]}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="result section-pad" id="result">
        <div className="result-copy">
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
        </div>
        <div className="instructor-copy">
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

      {/* <section className="fit section-pad">
        <div>
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
      </section> */}

      <section className="pricing section-pad" id="price">
        <div className="pricing-heading">
          <div>
            <h2>
              ВЫБЕРИ
              <br />
              <em>свой тариф.</em>
            </h2>
          </div>
        </div>
        <div className="pricing-grid">
          {course.plans.map((plan) => (
            <article
              className={`plan-card ${plan.featured ? 'featured' : ''}`}
              key={plan.code}
            >
              <div className="plan-name">
                <h3>{plan.name}</h3>
              </div>
              <div className="plan-price-wrap">
                <span className="plan-discount">−20%</span>
                <del>{plan.oldPrice}</del>
                <strong className="plan-price">{plan.price}</strong>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                href={planWhatsAppUrl(plan.name)}
                target="_blank"
                rel="noreferrer"
              >
                Подробнее <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <div>
          <h2>
            ЧАСТЫЕ
            <br />
            <em>вопросы.</em>
          </h2>
        </div>
        <div className="faq-list">
          {course.faq.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <i>+</i>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-copy">
          <h2>
            СЛЕДУЮЩИЙ
            <br />
            РОЛИК ТЫ
            <br />
            <em>смонтируешь иначе.</em>
          </h2>
          <p className="final-cta-text">
            Выбери свой тариф и начни собирать ролики, которые хочется
            досмотреть до конца.
          </p>
          <div className="final-cta-actions">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              Записаться на курс <span>↗</span>
            </a>
            <p>
              <strong>−20%</strong>
              <span>на все тарифы</span>
            </p>
          </div>
        </div>
        <div className="final-cta-visual" aria-hidden="true">
          <div className="cta-video-frame">
            <i />
            <span>▶</span>
          </div>
          <div className="end-timeline">
            <i />
            <i />
            <i />
            <b />
          </div>
        </div>
      </section>

      <footer id="legal">
        <a className="wordmark" href="#top" aria-label="В начало">
          <span className="logo-symbol" aria-hidden="true">
            <b>m</b>
            <i />
          </span>
          <span className="logo-name">
            medu<em>za</em>
          </span>
          <span className="logo-label">CUT LAB</span>
        </a>
        <nav className="footer-nav" aria-label="Навигация в футере">
          <a href="#program">Программа</a>
          <a href="#work">Работы</a>
          <a href="#result">Результат</a>
          <a href="#author">Автор</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a
          className="footer-credit"
          href="https://itdos.dev"
          target="_blank"
          rel="noreferrer"
        >
          <span>Разработано</span>
          <strong>itdos.dev ↗</strong>
        </a>
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
