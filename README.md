# Best CRM Frontend

Современный CRM-дашборд, построенный на React + Vite с библиотекой UI-компонентов в стиле Twenty CRM.

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск проекта

```bash
npm run dev
```

Проект будет доступен по адресу `http://localhost:5173`

## 📦 UI-компоненты в стиле Twenty CRM

Проект включает в себя библиотеку UI-компонентов, вдохновленную дизайном Twenty CRM:

- **Современный профессиональный дизайн** для CRM-дашбордов
- **Чистые формы** с валидацией и обработкой ошибок
- **Таблицы с sortable колонками** для управления данными
- **Карточки с данными** для отображения информации
- **Кнопки с акцентами** и состояниями загрузки
- **Минималистичный responsive дизайн**

### Использование компонентов

```tsx
import { Button, Input, Card, Table, Badge } from '@/components/ui'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <h3>Add Contact</h3>
      </CardHeader>
      <CardContent>
        <Input label="Name" placeholder="Enter name" />
        <Button variant="primary">Save</Button>
      </CardContent>
    </Card>
  )
}
```

### Доступные компоненты

- **Button** - Кнопки с вариантами (primary, secondary, destructive, ghost)
- **Input** - Поля ввода с лейблами и обработкой ошибок
- **Card** - Карточки с header, content и footer
- **Dialog** - Модальные окна на Radix UI
- **DropdownMenu** - Выпадающие меню с действиями
- **Table** - Таблицы с sortable заголовками
- **Badge** - Значки статусов и категорий
- **Tooltip** - Всплывающие подсказки
- **Select** - Выпадающие списки
- **Avatar** - Аватары с fallback инициалами

### CRM-примеры использования

#### Форма добавления контакта
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">Add Contact</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Contact</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <Input label="Full Name" placeholder="John Doe" />
      <Input label="Email" type="email" placeholder="john@example.com" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </DialogContent>
</Dialog>
```

#### Таблица контактов
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead sortable>Name</TableHead>
      <TableHead sortable>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {contacts.map(contact => (
      <TableRow key={contact.id}>
        <TableCell>{contact.name}</TableCell>
        <TableCell>{contact.email}</TableCell>
        <TableCell>
          <Badge variant={contact.status === 'active' ? 'success' : 'secondary'}>
            {contact.status}
          </Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## 🎨 Дизайн-система

### Цветовая палитра
- **Primary**: Синие оттенки (#3B82F6, #2563EB, #1E40AF)
- **Secondary**: Серые оттенки (#64748B, #475569)
- **Background**: Белый (#FFFFFF)
- **Surface**: Светло-серый (#F8FAFC)
- **Success**: Зеленые оттенки для статусов
- **Destructive**: Красные оттенки для удаления

### Типографика
- **Шрифт**: Inter (ui-sans-serif)
- **Размеры**: text-sm, text-base, text-lg
- **Веса**: font-medium, font-semibold

### Компоненты
- **Border radius**: 0.375rem (rounded-md)
- **Shadows**: subtle (shadow-sm, shadow-md)
- **Hover effects**: transition-colors, hover:shadow-md
- **Focus states**: ring-2 ring-primary-500

## 🛠️ Разработка

### Storybook

Запуск Storybook для просмотра всех компонентов:

```bash
npm run storybook
```

Storybook будет доступен по адресу `http://localhost:6006`

### Тестирование

Запуск тестов:

```bash
npm run test
```

Запуск тестов с UI:

```bash
npm run test:ui
```

### Сборка

```bash
npm run build
```

## 📁 Структура проекта

```
src/
├── components/
│   └── ui/                 # UI-компоненты
│       ├── Button/
│       ├── Input/
│       ├── Card/
│       ├── Dialog/
│       ├── DropdownMenu/
│       ├── Table/
│       ├── Badge/
│       ├── Tooltip/
│       ├── Select/
│       ├── Avatar/
│       └── index.ts         # Экспорт всех компонентов
├── utils/
│   └── cn.ts               # Утилита для классов
├── stories/                # Storybook истории
├── __tests__/              # Unit тесты
└── index.css               # Tailwind CSS стили
```

## 🔧 Технологии

- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик
- **Tailwind CSS** - Стилизация
- **Radix UI** - Доступные примитивы
- **Lucide React** - Иконки
- **Storybook** - Документация компонентов
- **Vitest** - Тестирование

## 📝 Скрипты

- `npm run dev` - Запуск dev сервера
- `npm run build` - Сборка проекта
- `npm run preview` - Предварительный просмотр сборки
- `npm run test` - Запуск тестов
- `npm run test:ui` - Запуск тестов с UI
- `npm run storybook` - Запуск Storybook
- `npm run build-storybook` - Сборка Storybook
- `npm run lint` - Проверка кода

## 🎯 Особенности

- ✅ **TypeScript** - Полная типизация
- ✅ **Responsive** - Адаптивный дизайн
- ✅ **Accessible** - Доступность через Radix UI
- ✅ **Customizable** - Легкая кастомизация через пропсы
- ✅ **Tree-shaking** - Оптимизированная сборка
- ✅ **Modern** - Современные React паттерны
- ✅ **CRM-ready** - Готовые компоненты для CRM