import * as React from 'react';
import {createComponent} from '@lit-labs/react';
import {MyElement} from '@ajmchambers/components-core';

export const MyElementComponent = createComponent(
  React,
  'my-element',
  MyElement,
  {}
);