import { Table as AntTable } from 'antd';
import { TableProps } from 'antd/es/table';

export const Table = <RecordType extends Record<keyof RecordType, unknown>>({
  dataSource,
  rowKey = 'id',
  ...rest
}: TableProps<RecordType>): JSX.Element => {
  return (
    <AntTable<RecordType>
      dataSource={dataSource || []}
      rowKey={rowKey}
      {...rest}
    />
  );
};

export default Table;
