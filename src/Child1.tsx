import React, { memo } from 'react';

type Props = {};

const Child1 = (props: Props) => {
  console.log('render child 1');

  return <div>hello from child 1 component</div>;
};

export default memo(Child1);
