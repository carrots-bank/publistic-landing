"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import IntroAnimation from "@/components/IntroAnimation";
import LogoMarkP from "@/components/LogoMarkP"

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="overflow-hidden">
      <IntroAnimation />

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/70 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <LogoMarkP size={28} />        {/* ← квадратная иконка */}
              <span className="font-mont text-lg">Publistic</span>  {/* ← надпись оставляем как есть */}
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
            <a href="#features" className="hover:text-white">Фичи</a>
            <a href="#how" className="hover:text-white">Как это работает</a>
            <a href="#benefits" className="hover:text-white">Преимущества</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <button onClick={() => setOpen(true)} className="btn btn-primary rounded-2xl text-sm">
            Получить консультацию
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="container py-20 md:py-28 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <ScrollReveal y={18}>
            <h1 className="h1 font-mont">
              Личный TG-модератор
              <span className="block accent-text">Publistic AI</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal y={12} delay={0.06}>
            <p className="sub mt-5 max-w-xl">
              Ваш персональный AI-ассистент, который анализирует тренды в реальном времени, генерирует контент под вашу аудиторию и публикует по расписанию. Полный контроль остаётся за вами — никаких компромиссов.
            </p>
          </ScrollReveal>

          <ScrollReveal y={18} delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setOpen(true)} className="btn btn-primary rounded-2xl">
                Получить консультацию бесплатно
              </button>
              <a href="https://t.me/WKristianW" className="btn btn-ghost rounded-2xl" target="_blank">
                Связаться в Telegram
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal y={10} delay={0.18}>
            <p className="mt-4 text-sm text-muted">Каналы любого формата. От стартапа до медиа-гиганта. Всё утверждаете Вы.</p>
          </ScrollReveal>
        </div>

      <Parallax strength={0.3}> 
        <HeroGraphic /> 
      </Parallax>
      </section>

      {/* PROBLEM → SOLUTION */}
      <SkewOnScroll max={6}>
        <section className="container py-12">
          <ScrollReveal y={18}>
            <div className="card">
              <h2 className="h2">Админы дорогие. Ошибки — ещё дороже.</h2>
              <p className="sub mt-3">
                Люди устают, пропускают тренды и сроки. Publistic AI анализирует десятки каналов и медиа в реальном времени,
                предлагает темы и генерирует посты в вашем стиле — вовремя, стабильно и без человеческого фактора.
              </p>
            </div>
          </ScrollReveal>
        </section>
      </SkewOnScroll>

      {/* FEATURES */}
      <section id="features" className="container py-16">
        <ScrollReveal y={18}>
          <h2 className="h2">Возможности</h2>
        </ScrollReveal>

        <SkewOnScroll max={7}>
          <ScrollReveal
            cascade
            y={22}
            stagger={0.08}
            threshold={0.35}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((f) => (
              <div key={f.title} className="card">
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.text}</p>
              </div>
            ))}
          </ScrollReveal>
        </SkewOnScroll>
      </section>

      {/* HOW IT WORKS */}
      <SkewOnScroll max={6}>
        <section id="how" className="container py-16 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <ScrollReveal y={18}>
              <h2 className="h2">От идеи — к посту</h2>
            </ScrollReveal>
            <ScrollReveal y={12} delay={0.06}>
              <p className="text-muted mt-4">
                От первой настройки до регулярных публикаций — понятный процесс без лишних шагов.
              </p>
            </ScrollReveal>
            <ScrollReveal y={12} delay={0.12}>
              <ol className="mt-6 grid gap-6">
                {steps.map((s, i) => (
                  <li key={i} className="card">
                    <div className="badge">Шаг {i + 1}</div>
                    <h3 className="mt-2 font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted">{s.text}</p>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>

          <Parallax strength={0.35}>
            <img
              src="/illustration.png"
              alt="От идеи — к посту"
              className="rounded-2xl shadow-2xl"
            />
          </Parallax>
        </section>
      </SkewOnScroll>

      {/* BENEFITS */}
      <section id="benefits" className="container py-16">
        <ScrollReveal y={18}>
          <h2 className="h2">Преимущества</h2>
        </ScrollReveal>

        <SkewOnScroll max={7}>
          <ScrollReveal cascade y={22} stagger={0.08} threshold={0.35} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b} className="card text-sm text-muted">{b}</div>
            ))}
          </ScrollReveal>
        </SkewOnScroll>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-16">
        <ScrollReveal y={18}>
          <h2 className="h2">FAQ</h2>
        </ScrollReveal>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faq.map((f) => (
            <ScrollReveal key={f.q} y={12}>
              <details className="card">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-2 text-sm text-muted">{f.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </section>

        {/* CTA */}
      <section className="relative py-28 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-center">
        <ScrollReveal y={24} duration={0.7} threshold={0.25}>
          <h2 className="h2">Готовы попробовать?</h2>
          <p className="mt-4 text-lg">Присоединяйтесь сегодня и ускорьте свою работу.</p>
          <button onClick={() => setOpen(true)} className="btn btn-ghost bg-white/10 hover:bg-white/20 rounded-2xl mt-6">
            Начать бесплатно
          </button>
        </ScrollReveal>
      </section> 

      {/* FOOTER */}
      <footer className="sticky top-0 z-40 border-b border-white/10 bg-ink/70 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <LogoMarkP size={28} />        {/* ← квадратная иконка */}
              <span className="text-sm text-gray-500">Publistic</span>
    </div>
    <div className="text-sm text-gray-500">
      © {new Date().getFullYear()} Publistic
    </div>
        </div>
      </footer>

      {open && <ContactModal onClose={() => setOpen(false)} />}
    </main>
  );
}

/* ----------------- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ В ЭТОМ ЖЕ ФАЙЛЕ ----------------- */

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" aria-label="Publistic logo">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#4DA3FF"/>
          <stop offset="50%" stopColor="#7B5CFF"/>
          <stop offset="100%" stopColor="#21D0C3"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" stroke="url(#g)" fill="transparent"/>
      <path d="M12 30 L36 12 L28 36 L24 28 L12 30 Z" stroke="url(#g)" strokeWidth="2" fill="none"/>
      <text x="14" y="40" fontSize="10" fill="#fff">P</text>
    </svg>
  );
}

function HeroGraphic() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.4, once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="aspect-square w-full max-w-[520px] mx-auto rounded-3xl border border-transparent bg-white/1 backdrop-blur p-8">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="gg" x1="0" x2="1">
              <stop offset="0%" stopColor="#4DA3FF"/>
              <stop offset="50%" stopColor="#7B5CFF"/>
              <stop offset="100%" stopColor="#21D0C3"/>
            </linearGradient>
          </defs>
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} cx="200" cy="200" r={40 + i * 20} stroke="rgba(167,176,191,0.18)" fill="none" />
          ))}
          
        </svg>
        {/* Центрируем наш готовый логотип поверх кругов */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <LogoMarkP size={290} /> {/* подправь размер при желании */}
        </div>
      </div>
    </motion.div>
      
    
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" role="dialog" aria-modal>
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-ink p-6 shadow-glow">
        <div className="flex items-center justify-between">
          <h3 className="font-mont text-2xl">Заявка на консультацию</h3>
          <button onClick={onClose} className="btn btn-ghost rounded-xl px-3 py-2">Закрыть</button>
        </div>
        <form className="mt-4 grid gap-4" action="/api/contact" method="POST">
  <label className="grid gap-2">
    <span className="text-sm text-muted">Имя</span>
    <input required name="name" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/20" />
  </label>

  <label className="grid gap-2">
    <span className="text-sm text-muted">E-mail</span>
    <input type="email" required name="email" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/20" />
  </label>

  <label className="grid gap-2">
    <span className="text-sm text-muted">Telegram/WhatsApp</span>
    <input name="messenger" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/20" />
  </label>

  <label className="grid gap-2">
    <span className="text-sm text-muted">Комментарий</span>
    <textarea name="comment" rows={4} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/20" />
  </label>

  {/* honeypot */}
  <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

  <button className="btn btn-primary rounded-2xl" type="submit">Отправить заявку</button>
  <p className="text-xs text-muted">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
</form>

      </div>
    </div>
  );
}

/* ----------------- ЭФФЕКТЫ СКРОЛЛА (в этом же файле, чтобы всё работало сразу) ----------------- */

import { ReactNode, useRef } from "react";
import { useScroll, useTransform, useSpring, useVelocity } from "framer-motion";

/** Параллакс: слой двигается по Y чуть иначе, создавая глубину */
function Parallax({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${strength * 100}%`]);
  return (
    <div ref={ref} className={className} style={{ position: "relative", overflow: "visible" }}>
      <motion.div style={{ y, willChange: "transform" }}>{children}</motion.div>
    </div>
  );
}

/** Skew при прокрутке: едва заметный наклон по скорости скролла */
function SkewOnScroll({ children, max = 8, className }: { children: ReactNode; max?: number; className?: string }) {
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { damping: 50, stiffness: 400 });
  const skewX = useTransform(smooth, (v) => {
    const clamped = Math.max(-2000, Math.min(2000, v));
    return (clamped / 2000) * max;
  });
  return (
    <motion.div className={className} style={{ skewX, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}

/* ----------------- ДАННЫЕ ----------------- */

const features = [
  { icon: "📡", title: "Аналитика в реальном времени", text: "Тренды всегда под контролем" },
  { icon: "✍️", title: "AI-контент любого формата", text: "Текст, фото, видео, аудио" },
  { icon: "🔥", title: "Горячие темы", text: "Только то, что цепляет" },
  { icon: "🎨", title: "Индивидуальный стиль", text: "Ваш тон, ваш язык" },
  { icon: "⏰", title: "Гибкий график", text: "Посты в заранее определенное время" },
  { icon: "🖼", title: "Водяные знаки и брендинг", text: "Защита медиа и узнаваемость." },
  { icon: "📢", title: "Рекламные посты", text: "Нативно. Эффективно. Уместно." },
  { icon: "✅", title: "Предпросмотр и контроль", text: "Каждый пост — с вашего согласия" },
];

const steps = [
  { title: "Созваниваемся: цели, тематика, стиль.", text: "Фиксируем KPI и формат работы." },
  { title: "Настраиваем ассистента под Ваши запросы", text: "Подключаем источники и шаблоны." },
  { title: "Тестируем систему", text: "Редактируем настройки, для 100% соответствия Вашим запросам." },
  { title: "Запуск", text: "Наблюдаете рост, регулируете параметры." },
];

const benefits = [
  "Экономия на постоянных расходах.",
  "Время владельца — на стратегию и партнёрства.",
  "Точность и регулярность без сбоев.",
  "Масштабируемость и адаптация под любые объёмы.",
  "Онлайн поддержка: баг-фиксы, ответы, помощь.",
  "Кастомизация под задачи и бренд.",
];

const faq = [
  { q: "Будет ли бот публиковать без меня?", a: "Нет. Вы утверждаете посты через предпросмотр." },
  { q: "Это подходит для маленьких каналов?", a: "Да. Эффект особенно заметен при росте." },
  { q: "Как считается цена?", a: "Индивидуально: покупка навсегда/поддержка/кастом-фичи. Возможна рассрочка." },
  { q: "Поможете с установкой?", a: "Да, сделаем установку и обучим работе." },
  { q: "Можно ли свой стиль/тон?", a: "Да, ассистент пишет в заданной манере и на нужном языке." },
  { q: "Делаете рекламу?", a: "Да, готовим рекламные посты и нативные интеграции." },
];
