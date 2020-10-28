import { addNewTask, updateTask } from "./server";

(async function myFunc() {
  await addNewTask({
    id: "12345",
    name: "My task",
  });

  await updateTask({
    id: "12345",
    name: "My task - UPDATED!",
  });
})();
