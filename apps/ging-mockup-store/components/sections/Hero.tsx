import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="text-left mb-[100px] py-20">
      <h1 className="text-[64px] md:text-[64px] sm:text-4xl font-thin text-gray-800 mb-[30px] tracking-[4px] leading-[1.2]">
        {t('title').split('').map((char, i) => (
          <span key={i}>
            {char}
            {i === 1 && <br />}
          </span>
        ))}
      </h1>
      <p className="text-xl sm:text-lg text-gray-600 font-light max-w-[500px] tracking-[1px] leading-[1.8]">
        {t('subtitle')}
      </p>
    </section>
  );
}