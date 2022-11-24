/*import { Alert } from 'antd';

type AlerType = {type: "success" | "warning" | "error" | "info", description: string}

const ModalMessage = ({type, description}:AlerType) => (
    <Alert message={description} type={type} />
);

export default ModalMessage;
*/
import { message } from 'antd';
import 'antd/dist/reset.css';
type ComponentMessage = {
  type: 'success' | 'warning' | 'error' | 'info';
  description: string;
};

function ModalMessage(objectMsg: ComponentMessage) {
  const element =
    objectMsg.type === 'warning'
      ? message.warning(objectMsg.description)
      : objectMsg.type === 'success'
      ? message.success(objectMsg.description)
      : objectMsg.type === 'error'
      ? message.error(objectMsg.description)
      : objectMsg.type === 'info'
      ? message.info(objectMsg.description)
      : null;

  return <>{element}</>;
}

export default ModalMessage;
