import { message } from 'antd';

export const feedBackMessage = (msg) => {
    switch(msg.type){
      case "success":
          message.success(msg.msg);
        break;
      case "error":
          message.error(msg.msg);
        break;
      case "warning":
          message.warning(msg.msg);
        break;
      default:
        break;
    }
};