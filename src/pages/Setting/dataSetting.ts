export interface dataSettingType {
  id: number;
  title: string;
  descr: string;
  text: string;
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
    text: "Мы уважаем вашу конфиденциальность и обязуемся защищать ваши личные данные. Собираемая информация используется только для улучшения сервиса и не передается третьим лицам. Вы можете в любое время запросить удаление ваших данных.",
    isModal: true,
    isActive: false,
  },
  {
    id: 2,
    title: "Поддержка",
    descr: "Свяжитесь с нами",
    text: "",
    isModal: true,
    isActive: false,
  },
];
