import { useTranslations } from 'next-intl';

export default function HomePage() {
  console.log('HomePage');
  const t = useTranslations('HomePage');
  console.log('t: ', t);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('description')}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Tech Stack Included:</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>NextJS 15 with App Router</li>
            <li>TypeScript</li>
            <li>Tailwind CSS v4</li>
            <li>Next Intl for internationalization</li>
            <li>Payload CMS for content management</li>
            <li>Shared ESLint and TypeScript configurations</li>
          </ul>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Ready to customize for your client projects!</p>
        </div>
      </main>
    </div>
  );
}
