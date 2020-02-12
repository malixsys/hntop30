import React from 'react';
import {App} from "../components/App";

export default {
  title: 'App',
  component: App,
};

export const AppExample = () => (
    <App><h3>children</h3></App>
);

AppExample.story = {
  name: 'Simple App',
};
