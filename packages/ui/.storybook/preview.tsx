import type { Preview } from '@storybook/react'
import { Theme, YStack } from 'tamagui'
import { UIProvider } from '../src/components/UIProvider'

type StorybookTheme = 'light' | 'dark'

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light / dark appearance',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    function WithThemedCanvas(Story, context) {
      const theme = (context.globals.theme ?? 'light') as StorybookTheme
      return (
        <UIProvider defaultTheme={theme}>
          <Theme name={theme}>
            <YStack flex={1} backgroundColor="$background" minHeight="100vh" padding="$4">
              <Story />
            </YStack>
          </Theme>
        </UIProvider>
      )
    },
  ],
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
}

export default preview
