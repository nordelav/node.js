*Перше домашнє завдання - трекер звичок.

Присутні наступні функції (запускаються через node.js):

  add   --name "<текст звички>" --freq <daily|weekly|monthly> — додає звичку;
  list — показує всі звички у вигляді таблиці;
  done  --id <ідентифікатор> — відмічає, що звичку виконано сьогодні;
  stats — друкує для кожної звички відсоток виконання за останні 7(30) днів;
  delete --id <ідентифікатор> — видаляє звичку;
  update --id <ідентифікатор> --name "<текст звички>" --freq <daily|weekly|monthly> — вносить зміни у назву, або регулярність;
