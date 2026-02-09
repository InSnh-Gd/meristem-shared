export type WsAckAction = 'CONNECTED' | 'SUBSCRIBE' | 'UNSUBSCRIBE' | 'PONG';

export type WsErrorCode = 'AUTH_REQUIRED' | 'AUTH_INVALID' | 'NOT_CONNECTED' | 'INVALID_MESSAGE' | 'INVALID_TOPIC';

export type WsTopic = `task.${string}.status` | `node.${string}.status`;

export type WsAckMessage = {
  type: 'ACK';
  action: WsAckAction;
  topic?: string;
};

export type WsErrorMessage = {
  type: 'ERROR';
  code: WsErrorCode;
  error: string;
  message: string;
};

export type WsPushMessage = {
  type: 'PUSH';
  topic: WsTopic;
  payload: unknown;
  trace_id: string;
};

export type WsServerMessage = WsAckMessage | WsErrorMessage | WsPushMessage;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isWsTopic = (value: string): value is WsTopic =>
  /^task\.[^.]+\.status$/.test(value) || /^node\.[^.]+\.status$/.test(value);

export const parseWsPushMessage = (value: unknown): WsPushMessage | null => {
  if (!isRecord(value)) {
    return null;
  }

  if (value.type !== 'PUSH') {
    return null;
  }

  if (typeof value.topic !== 'string' || !isWsTopic(value.topic)) {
    return null;
  }

  if (typeof value.trace_id !== 'string' || value.trace_id.length === 0) {
    return null;
  }

  return {
    type: 'PUSH',
    topic: value.topic,
    payload: value.payload,
    trace_id: value.trace_id,
  };
};
