import { Stores } from './createStore';
import StoreBase from './StoreBase';

export class RootStore<T extends Stores> {
  constructor(stores: T) {
    const combined = Object.keys(stores).reduce(
      (acc: Stores, item: string) => {
        return {
          ...acc,
          [item]: (stores[item as keyof Stores] as StoreBase).init(this as unknown as Stores)
        };
      },
      {
        ...stores
      }
    );
    Object.assign(this, { ...combined });
  }
}
