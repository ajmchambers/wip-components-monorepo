import * as React from 'react';
import {createComponent} from '@lit-labs/react';
import {MyButton} from '@ajmchambers/components-core';

export const MyButtonComponent = createComponent(
  React,
  'my-button',
  MyButton,
  {}
);