import { createMachine } from 'xstate';

const eventCreationModalMachine = createMachine({
  id: 'eventCreationModal',
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUBMIT: 'submitting',
      },
    },
    submitting: {
      on: {
        SUCCESS: 'fetch',
        REJECT: 'idle',
      },
    },
    fetch: {
      on: {
        CLOSE: 'idle',
      },
    },
  },
});

export default eventCreationModalMachine;
