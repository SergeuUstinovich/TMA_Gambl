export interface dataSettingType {
  id: number;
  title: string;
  descr: string;
  text?: string;
  text2?: string;
  text3?: string;
  isModal: boolean;
  isActive: boolean;
}

export const dataSetting = [
  {
    id: 1,
    title: "Уведомления",
    descr: "Не пропустите выгодные предложения ",
    text: "",
    isModal: false,
    isActive: JSON.parse(localStorage.getItem('messeng') || 'false'),
  },
  {
    id: 2,
    title: "Политика конфиденциальности",
    descr: "Узнайте, как мы защищаем ваши данные",
    text: "Используя наше приложеие вы соглашаетесь с настоящими правилами.",
    text2: 'Запрещено использование сервиса для незаконной деятельности.',
    text3: 'Мы оставляем за собой право изменять правила в любое время.',
    isModal: true,
    isActive: false,
  },
  {
    id: 3,
    title: "Поддержка",
    descr: "Свяжитесь с нами",
    text: "Email: support@dephub.casino",
    text2: 'Telegram: @dephub_support',
    text3: 'Время работы: 24/7',
    isModal: true,
    isActive: false,
  },
  {
    id: 3,
    title: "О приложении",
    descr: "Версия 0.1",
    text: "Версия 0.1",
    text2: 'Разработчик: DepHub Team',
    text3: '© 2025 DepHub. Все права защищены.',
    isModal: true,
    isActive: false,
  },
];
