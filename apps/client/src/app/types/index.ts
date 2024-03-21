import React from 'react';

export interface IButton {
  text?: string;
  icon?: React.ReactNode;
  type: 'text' | 'link' | 'default' | 'primary' | 'dashed' | undefined;
  className?: string;
  danger?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  loading?: boolean | { delay: number };
}

export interface Route {
  key: string;
  text: string;
  linksTo: string;
  exact?: boolean;
  public?: boolean;
  showOnMenu: boolean;
  component: React.ReactNode;
  subItems?: Route[];
}

export interface QuizType {
  _id: string;
  course: string;
  teacher: string;
  quizTitle: string;
  description: string;
  timestamp: Date;
  duration: number;
  category: string;
  level: string;
  questions: QuestionType[];
}

export interface QuestionType {
  _id: string;
  questionText: string;
  type: 'multiple' | 'boolean';
  options: string[];
  correctOption: string;
  level: 'easy' | 'medium' | 'hard';
}

