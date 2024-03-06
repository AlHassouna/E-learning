import { Stores } from './createStore';

class StoreBase {
  public rootStore!: Stores;

  public init(rootStore: Stores): StoreBase {
    this.rootStore = rootStore;

    return this;
  }
}

export default StoreBase;
