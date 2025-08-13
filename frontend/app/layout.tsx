// frontend/app/layout.tsx
import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Roumain Notes',
  description: 'Importer et analyser tes cours de roumain (.docx/.pptx)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
