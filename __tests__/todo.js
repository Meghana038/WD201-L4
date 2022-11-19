/* eslint-disable no-undef */
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("TODO list is being tested", () => {
  beforeAll(() => {
    add({
      title: "watching crush for 8 hours",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("add new TODO list", () => {
    // expect(all.length).toBe(0);
    let length = all.length;

    add({
      title: "thinking about crush for 2 hours",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("completed TODO is marked", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("overdue TODOs are brought back", () => {
    let lt = overdue();

    expect(
      lt.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("today's due TODOs are retrieved", () => {
    let lt = dueToday();

    expect(
      lt.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("retrieve TODOs which are due for later", () => {
    let lt = dueLater();

    expect(
      lt.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
