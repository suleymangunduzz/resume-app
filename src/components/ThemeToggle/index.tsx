import ThemeToggleClient from '@/components/ThemeToggle/ThemeToggleClient';
import { cookies } from 'next/headers';

export default async function ServerWrapper() {
  const cookieStore = await cookies();
  const themeCookie =
    cookieStore.get('theme')?.value === 'dark' ? 'dark' : 'light';
  const initialTheme = themeCookie === 'dark' ? 'dark' : 'light';

  return <ThemeToggleClient initialTheme={initialTheme} />;
}
