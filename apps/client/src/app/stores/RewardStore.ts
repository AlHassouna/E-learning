import { Response } from 'express';
import StoreBase from './StoreBase';

import { action, makeObservable, observable } from 'mobx';

import { postReward, getRewards } from '../api/index';


class RewardStore extends StoreBase {
  public type = '';
  public rewardMessage: string | null = null;
  public isLoadingResponse = false;
  public rewards: any[] = [];

  constructor() {
    super();

    makeObservable(this, {
      // Observables -
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rewards: observable,
      type: observable,
      isLoadingResponse: observable,
      rewardMessage: observable,
      // Actions
      // XHR Actions
      setIsLoadingResponse: action,
      postReward: action,
      getRewards: action
    });
  }

  public setIsLoadingResponse = (flag: boolean): void => {
    this.isLoadingResponse = flag;
  };
  public postReward = async (payload: any): Promise<void> => {
    try {
      this.setIsLoadingResponse(true);
      const response = await postReward(payload);
      console.log('response: ', response)
      console.log('reward: ', response.reward);
      console.log('reward type: ', response.reward.type);

      
      const  type  = response.reward.type;
      this.type = type;
      console.log('this type: ',this.type)
    } catch (e: any) {
      this.rewardMessage = e.message;
    } finally {
      this.setIsLoadingResponse(false);
    }
  };
  public getRewards = async (): Promise<void> => {
    try {
      this.setIsLoadingResponse(true);
      const rewards = await getRewards();
      this.rewards = rewards;
    } catch (e: any) {
      this.rewardMessage = e.message;
    } finally {
      this.setIsLoadingResponse(false);
    }
  };
}

export default RewardStore;
