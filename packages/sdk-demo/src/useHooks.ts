import { useEffect, useState } from 'react';

export default (props: any, ref: any) => {
  console.log('hooks', props, ref);
  const [comp1Data, setComp1Data] = useState({});

  useEffect(() => {}, []);

  return {
    Comp1: {},
    Comp2: {},
  };
};
