import { View, type ViewProps } from 'tamagui'
import { Text } from '../text/text'

export interface TableColumn<T> {
  key: keyof T & string
  header: string
  align?: 'left' | 'center' | 'right'
  render?: (row: T, index: number) => React.ReactNode
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: Array<TableColumn<T>>
  data: T[]
  containerStyle?: ViewProps
  headerStyle?: ViewProps
  rowStyle?: ViewProps
  cellStyle?: ViewProps
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  containerStyle,
  headerStyle,
  rowStyle,
  cellStyle,
}: TableProps<T>) {
  return (
    <View
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$4"
      overflow="hidden"
      {...containerStyle}
    >
      <View
        backgroundColor="$color2"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
        {...headerStyle}
      >
        <View flexDirection="row">
          {columns.map((column) => (
            <View
              key={column.key}
              flex={1}
              paddingHorizontal="$3"
              paddingVertical="$2.5"
              {...cellStyle}
            >
              <Text variant="label" bold color="$color11" textAlign={column.align ?? 'left'}>
                {column.header}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {data.map((row, index) => (
        <View
          key={index}
          flexDirection="row"
          borderBottomWidth={index === data.length - 1 ? 0 : 1}
          borderBottomColor="$borderColor"
          {...rowStyle}
        >
          {columns.map((column) => (
            <View
              key={column.key}
              flex={1}
              paddingHorizontal="$3"
              paddingVertical="$2.5"
              {...cellStyle}
            >
              {column.render ? (
                column.render(row, index)
              ) : (
                <Text variant="bodySm" color="$color12" textAlign={column.align ?? 'left'}>
                  {String(row[column.key] ?? '')}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}
