import React, { useEffect } from 'react';
import { DModel } from '../../core/';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/setupContext';

const quizAttemptData = {
  score: 10,
  rewardEarned: true
};


export const RewardModel: React.FC = observer(() => {
  const { reward } = useStore();
  const { postReward, type } = reward;

  // useEffect(() => {
  //   const calculateReward = async () => {
  //     await postReward(quizAttemptData);
  //   };
  //   calculateReward();
  // }, [postReward]);

  return (
    <div>
      {/*<DModel title="Reward">*/}
      {/*  <div>*/}
      {/*    <p>Quiz Attempt</p>*/}

      {/*  </div>*/}
      {/*</DModel>*/}
    </div>
  );
});
