/**
 * 传输层与持久化层转换的函数签名。
 * 具体实现应由消费方（core/client）提供，shared 仅定义契约。
 */
export type ToTransport<TDoc, TTransport> = (doc: TDoc) => TTransport;

export type FromTransport<TTransport, TDoc> = (
  transport: TTransport,
) => Partial<TDoc>;
