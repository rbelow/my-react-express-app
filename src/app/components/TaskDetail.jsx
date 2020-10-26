import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";

const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskCompletion,
  setTaskName,
  setTaskGroup,
}) => {
  return (
    <div>
      <div>
        <input onChange={setTaskName} value={task.name} />
      </div>
      <h2>{task.name}</h2>
      <button onClick={() => setTaskCompletion(id, !isComplete)}>
        {isComplete ? `Reopen` : `Complete`}
      </button>
      <select onChange={setTaskGroup} value={task.group} name="" id="">
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
      <Link to="/dashboard">
        <button>Done</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.match.params.id;
  let task = state.tasks.find((task) => task.id == id); // FIXME: ===
  let groups = state.groups;

  return {
    id,
    task,
    groups,
    isComplete: task.isComplete,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.match.params.id; // FIXME: match
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(mutations.setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(mutations.setTaskName(id, e.target.value));
    },
  };
};

export const ConnectedTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
