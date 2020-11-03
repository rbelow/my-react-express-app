import { take, put, select } from "redux-saga/effects";

import uuid from "uuid";
import axios from "axios";

import * as mutations from "./mutations";

const url = "http://localhost:7777";

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    // const ownerID = yield select(state=>state.session.id);
    const ownerID = `U1`;

    // const taskID = uuid(); FIXME:
    const taskID = Math.floor(Math.random() * 1000 + 1).toString();
    yield put(mutations.createTask(taskID, groupID, ownerID));
    const { res } = yield axios.post(url + `/task/new`, {
      task: {
        id: taskID,
        owner: ownerID,
        isComplete: false,
        name: "New task",
      },
    });

    //   console.info("Got response,", res);
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE,
    ]);
    axios.post(url + `/task/update`, {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete,
      },
    });
  }
}
