import { expect, test } from 'bun:test';
import { parseWsPushMessage } from '../types/ws';

test('parseWsPushMessage returns push payload for valid task topic', (): void => {
  const parsed = parseWsPushMessage({
    type: 'PUSH',
    topic: 'task.1.status',
    payload: { state: 'running' },
    trace_id: 'trace-1',
  });

  expect(parsed).not.toBeNull();
  expect(parsed).toMatchObject({
    type: 'PUSH',
    topic: 'task.1.status',
  });
});

test('parseWsPushMessage rejects unsupported topic', (): void => {
  const parsed = parseWsPushMessage({
    type: 'PUSH',
    topic: 'logs.node-1',
    payload: { state: 'running' },
    trace_id: 'trace-1',
  });

  expect(parsed).toBeNull();
});
