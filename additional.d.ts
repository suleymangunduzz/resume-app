import { FC, ReactElement } from 'react';

declare global {
  var __BASE_API_URL__:
    | 'http://localhost:3001'
    | 'https://resume-app-backend.vercel.app/';

  var FCC: FC<{ children: ReactElement }>;
}
