import { useTranslations } from 'next-intl';
import ClientInit from '@/components/CommentForm/ClientInit';
import config from '@/components/CommentForm/config';

export default function CommentForm() {
  const t = useTranslations('CommentsPage.form');

  const actionMessages = {
    successMessage: t('successMessage'),
    errorMessage: t('errorMessage'),
    submittingMessage: t('submittingMessage'),
  };

  return (
    <section id={config.sectionId} className="max-w-lg mx-auto space-y-5">
      <ClientInit actionMessages={actionMessages} />
      <h2 className="text-2xl font-semibold text-center">{t('title')}</h2>

      <form
        id={config.formId}
        className="bg-white rounded-2xl shadow-md p-6 space-y-5"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {t('fields.name')} <span className="text-red-500">*</span>
          </label>
          <input
            autoComplete="name"
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            {t('fields.title')} <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('fields.titlePlaceholder')}
          />
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700"
          >
            {t('fields.companyName')} <span className="text-red-500">*</span>
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="TechCorp Inc."
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            {t('fields.description')} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('fields.descriptionPlaceholder')}
          />
        </div>

        <button
          type="submit"
          id={config.submitButtonId}
          className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          {t('submitCTAText')}
        </button>

        {/* Success / error message container */}
        <div
          id={config.messageElementId}
          className="mt-3 text-center font-medium"
        ></div>
      </form>
    </section>
  );
}
