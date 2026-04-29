import React from 'react'
import type { Preview } from '@storybook/react'
import { UIProvider } from '../src/components/UIProvider'

const preview: Preview = {
  decorators: [
    function WithUIProvider(Story) {
      return (
        <UIProvider defaultTheme="light">
          <Story />
        </UIProvider>
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
}

export default preview
