'use strict';

const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build'),
  resolve: {
    alias: {
      '@/lib/utils': path.resolve(__dirname, '../src/lib/utils'),
      '@/components': path.resolve(__dirname, '../src/components/*'),
      // You can add other aliases here as well
    },
  },
};

module.exports = PATHS;
