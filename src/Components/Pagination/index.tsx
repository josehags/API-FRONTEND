import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

const showTotal: PaginationProps['showTotal'] = total => `Total ${total} items`;

const Page: React.FC = () => (
  <>
    <Pagination size="small" total={60} showTotal={showTotal} />
  </>
);

export default Page;
