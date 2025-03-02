'use client';


import React, { useEffect, useState } from 'react';
import { WhiteBlock } from '../white-block';
// Если понадобится, можно импортировать дополнительные компоненты из shadcn/ui для стилизации
// import { Typography } from '@/components/ui/typography';

interface Props {
  className?: string;
}

export const Vacansies: React.FC<Props> = ({ className }) => {
  // Статический массив вакансий
  const [vacancies, setVacancies] = useState<string[]>([
    'Повар',
    'Кондитер',
    'Упаковщик',
    'Грузчик',
    'Технолог'
  ]);

  // Задел на будущее: получение вакансий по API
  // useEffect(() => {
  //   fetch('/api/vacancies')
  //     .then((res) => res.json())
  //     .then((data: string[]) => setVacancies(data))
  //     .catch((err) => console.error('Ошибка получения вакансий:', err));
  // }, []);

  return (
    <WhiteBlock title="1. Вакансии" className={className}>
      {/* Рендерим список вакансий */}
      <div className="flex flex-col space-y-3">
        {vacancies.map((vacancy, index) => (
          <p key={index} className="text-lg font-medium text-gray-800">
            {vacancy}
          </p>
        ))}
      </div>
      {/* Ссылка на Google форму */}
      <div className="mt-6">
        <a
          href="https://forms.gle/your-google-form-link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Если вы считаете, что подходите нам, обязательно заполните форму!
        </a>
      </div>
    </WhiteBlock>
  );
};
